import os
import sys
import json
import urllib.request
import urllib.error

def get_webhook_url():
    # .env.local dosyasını manuel olarak oku (ekstra paket kurmamak için)
    try:
        with open('.env.local', 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('DISCORD_WEBHOOK_URL='):
                    return line.strip().split('=', 1)[1].strip(' "\'')
    except FileNotFoundError:
        pass
    return os.environ.get('DISCORD_WEBHOOK_URL')

WEBHOOK_URL = get_webhook_url()

if not WEBHOOK_URL:
    print("HATA: DISCORD_WEBHOOK_URL bulunamadı!")
    print("Lütfen projenin ana dizininde .env.local dosyası oluşturun ve içine şu satırı ekleyin:")
    print("DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...")
    sys.exit(1)

def send_discord_message(version, details=""):
    data = {
        "username": "Uçurumun Habercisi",
        "avatar_url": "https://img.itch.zone/aW1nLzE2MDcwMTM2LnBuZw==/315x250%23c/4E19%2Bs.png",
        "embeds": [
            {
                "title": f"🚨 YENİ YAMA YAYINLANDI: {version}",
                "description": f"Uçurum'a yeni bir güncelleme geldi! Sitemizi ziyaret ederek veya oyunu güncelleyerek yeniliklere göz atın.\n\n**Öne Çıkanlar:**\n{details}\n\n[Tüm Yama Geçmişini Gör](https://mystic-abyss.vercel.app/patch-notes) | [Oyunu İndir/Güncelle](https://arno4436.itch.io/the-mystic-abyys-2)",
                "color": 12595200,
                "footer": {
                    "text": "Mystic Abyss II Online"
                }
            }
        ]
    }

    req = urllib.request.Request(WEBHOOK_URL, json.dumps(data).encode('utf-8'), {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    })

    try:
        urllib.request.urlopen(req)
        print("BAŞARILI: Discord kanalına bildirim gönderildi!")
    except urllib.error.HTTPError as e:
        print(f"HATA: Discord'a gönderilemedi. (HTTP Kod: {e.code})")
        print(e.read().decode('utf-8'))
    except Exception as e:
        print(f"HATA: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Kullanım: python scripts/post_discord.py \"v1.5\" \"Özet metin buraya...\"")
        sys.exit(1)
        
    version = sys.argv[1]
    details = sys.argv[2] if len(sys.argv) > 2 else ""
    send_discord_message(version, details)
