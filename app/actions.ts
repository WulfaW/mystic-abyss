'use server'

export async function sendFeedbackToDiscord(formData: FormData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1555611175427776552/-xBYIqB7d0No-3u7_Pjwh1QnRfg6VPClcTzQ-98VFjxvhw1wWJ-83uZ9Ck6QaqkG6584';
  
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

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
            color: 12604203, // Diablo Red
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
      return { error: 'Discord\'a gönderilirken bir hata oluştu.' };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Bağlantı hatası oluştu.' };
  }
}
