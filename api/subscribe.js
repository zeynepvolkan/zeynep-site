export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email gerekli' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER = process.env.MAILCHIMP_SERVER;

  try {
    const response = await fetch(
      `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: 'Başarıyla abone oldunuz!' });
    } else if (data.title === 'Member Exists') {
      return res.status(400).json({ message: 'Bu e-posta zaten abone.' });
    } else {
      return res.status(400).json({ message: 'Bir hata oluştu, tekrar deneyin.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}
