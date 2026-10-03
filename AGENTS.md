<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# 🤖 MYSTIC ABYSS AI AGENT KURALLARI (AI AGENT WORKFLOWS)

## 🚀 YAMA NOTLARI VE DISCORD OTOMASYONU (PATCH NOTES AUTOMATION)
Kullanıcı (User) sana yeni bir yama notu (patch notes) verdiğinde, aşağıdaki 2 adımı **OTOMATİK OLARAK** arka arkaya yapmalısın. Asla kullanıcıya "Bunu Discord'a atayım mı?" diye sorma veya onun manuel yapmasını bekleme.

1. **Siteyi Güncelle (Update Website):** 
   Yama notlarını alıp `app/patch-notes/page.tsx` içindeki `PATCHES` dizisine (array) en başa (veya en sona) uygun ikonlar ve renklerle (Riot Games stili) ekle. Dosyayı kaydet.

2. **Discord'a Duyur (Post to Discord):**
   Kullanıcının Discord sunucusuna otomatik duyuru atmalısın. Projede hazır bir script var.
   Yama detaylarında kullanıcının sana verdiği TÜM maddeleri ve emojileri eksiksiz bir şekilde (hiçbir maddeyi silmeden ve özetlemeden) alt alta listeleyen bir içeriği `patch_details.txt` adlı bir dosyaya kaydet. (Bunu yapmak PowerShell'de tırnak işareti sorunlarını çözer).
   Sonra terminalden şu komutu çalıştır: `python scripts/post_discord.py "v1.5" "patch_details.txt"`
   Script senin yerine gerekli Webhook ayarlarını `.env.local` dosyasından okuyup çok havalı bir Discord Embed mesajını kanala fırlatacaktır.
   Komutu çalıştırdıktan sonra kullanıcıya "Siteyi güncelledim ve Discord kanalına yama duyurusunu fırlattım patron!" diye rapor ver.
