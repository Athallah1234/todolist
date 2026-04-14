import nodemailer from 'nodemailer';
import webpush from 'web-push';

// Email Transporter (Configure with your SMTP details in .env)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Push Notification Configuration
if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:support@checkit.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function sendEmailNotification(to: string, subject: string, message: string) {
  try {
    await transporter.sendMail({
      from: '"Check-It Notifications" <noreply@checkit.com>',
      to,
      subject,
      text: message,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e7ff; border-radius: 10px;">
              <h2 style="color: #4f46e5;">Check-It Notification</h2>
              <p style="color: #475569; font-size: 16px;">${message}</p>
              <footer style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
                © 2024 Check-It Platform. One task at a time.
              </footer>
            </div>`,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendPushNotification(subscription: any, payload: any) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error };
  }
}
