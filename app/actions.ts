'use server'

export async function sendFeedbackToDiscord(formData: FormData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

  if (!webhookUrl) {
    return { error: 'Sunucu ayarları eksik. Lütfen Webhook URL ekleyin.' }
  }

  if (!message || message.trim() === '') {
    return { error: 'Mesaj boş olamaz.' };
  }

  const senderName = name && name.trim() !== '' ? name.trim() : 'İsimsiz Bir Ruh';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "Uçurum Habercisi",
        avatar_url: "https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc1NC5wbmc=/original/Oi0skn.png",
        embeds: [
          {
            title: "📜 Uçurumdan Yeni Bir Mesaj Var!",
            color: 12604203,
            fields: [
              {
                name: "Gönderen",
                value: senderName,
                inline: true
              }
            ],
            description: message,
            timestamp: new Date().toISOString()
          }
        ]
      }),
    });

    if (!response.ok) {
      return { error: 'Discorda gönderilirken bir hata oluştu.' };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Bağlantı hatası oluştu.' };
  }
}
