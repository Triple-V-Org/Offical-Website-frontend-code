import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// PostgreSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// AWS SES client
const ses = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Initialize database table
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      source VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ip_address VARCHAR(45)
    )
  `);
  console.log('Database initialized');
}

// HTML Email template for welcome email to user
function getWelcomeEmailHtml(email) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Figwork</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1512 0%, #2d2420 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <img src="https://figwork.ai/img/figwork-wordmark.png" alt="Figwork" width="140" style="display: block; margin: 0 auto;" />
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #1a1512; line-height: 1.3;">
                You're on the waitlist!
              </h1>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Thank you for joining Figwork. We're building the world's first AI headhunter to help you land your next job by connecting you with recruiters across 50,000+ companies.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                We'll notify you as soon as we're ready to welcome you aboard. In the meantime, keep an eye on your inbox for exclusive updates and early access opportunities.
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Have questions? Just reply to this email — we read every message.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f6; padding: 30px 40px; border-top: 1px solid #eee;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1512;">
                      Figwork
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #888;">
                      The World's First AI Headhunter
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #aaa;">
                      © ${new Date().getFullYear()} Figwork. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// HTML Email template for support request notification
function getSupportRequestHtml(name, email, subject, message, timestamp, ip) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Support Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1512 0%, #2d2420 100%); padding: 30px 40px; text-align: center;">
              <img src="https://figwork.ai/img/figwork-wordmark.png" alt="Figwork" width="120" style="display: block; margin: 0 auto 16px auto;" />
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                New Support Request
              </h1>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">From</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1512;">${name}</p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #c75000;">${email}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Subject</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1512;">${subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Message</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1a1512; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Received</p>
                    <p style="margin: 0; font-size: 14px; color: #666;">${timestamp}</p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #999;">IP: ${ip || 'Unknown'}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #c75000 0%, #e67300 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 10px;">
                      Reply to ${name.split(' ')[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f6; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888;">
                This is an automated notification from Figwork Support
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// HTML Email template for support auto-reply to user
function getSupportAutoReplyHtml(name) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We received your message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1512 0%, #2d2420 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <img src="https://figwork.ai/img/figwork-wordmark.png" alt="Figwork" width="140" style="display: block; margin: 0 auto;" />
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #1a1512; line-height: 1.3;">
                We received your message
              </h1>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Hi ${name.split(' ')[0]},
              </p>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Thank you for reaching out to Figwork. We've received your message and a member of our team will get back to you shortly.
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                In the meantime, feel free to reply to this email if you have any additional information to share.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f6; padding: 30px 40px; border-top: 1px solid #eee;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1512;">
                      Figwork
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #888;">
                      The World's First AI Headhunter
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #aaa;">
                      &copy; ${new Date().getFullYear()} Figwork. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// HTML Email template for lead notification to admin
function getLeadNotificationHtml(email, source, timestamp, ip) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Waitlist Signup</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #c75000 0%, #e67300 100%); padding: 30px 40px; text-align: center;">
              <img src="https://figwork.ai/img/figwork-wordmark.png" alt="Figwork" width="120" style="display: block; margin: 0 auto 16px auto;" />
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                New Waitlist Signup
              </h1>
            </td>
          </tr>

          <!-- Lead Details -->
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Email</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #c75000;">${email}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Source</p>
                    <p style="margin: 0; font-size: 16px; color: #1a1512;">${source}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Timestamp</p>
                    <p style="margin: 0; font-size: 16px; color: #1a1512;">${timestamp}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">IP Address</p>
                    <p style="margin: 0; font-size: 16px; color: #1a1512;">${ip || 'Unknown'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f6; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888;">
                This is an automated notification from Figwork Waitlist System
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Send welcome email to user
async function sendWelcomeEmail(email) {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.FROM_EMAIL) {
    console.log('SES not configured, skipping welcome email');
    return;
  }

  try {
    await ses.send(new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: { Data: "You're on the Figwork waitlist!" },
        Body: {
          Html: { Data: getWelcomeEmailHtml(email) },
          Text: { Data: `Welcome to Figwork!\n\nThank you for joining our waitlist. We're building the world's first AI headhunter to help you land your next job.\n\nWe'll notify you as soon as we're ready to welcome you aboard.\n\nYour registered email: ${email}\n\n— The Figwork Team` },
        },
      },
    }));
    console.log('Welcome email sent to:', email);
  } catch (err) {
    console.error('Failed to send welcome email:', err.message);
  }
}

// Send lead notification to admin
async function sendLeadNotification(email, source, ip) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'app-account@triple3v.org';

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.FROM_EMAIL) {
    console.log('SES not configured, skipping lead notification');
    return;
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    await ses.send(new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [notificationEmail],
      },
      Message: {
        Subject: { Data: `[Figwork Lead] New Signup: ${email}` },
        Body: {
          Html: { Data: getLeadNotificationHtml(email, source, timestamp, ip) },
          Text: { Data: `New Figwork Waitlist Signup\n\nEmail: ${email}\nSource: ${source}\nTime: ${timestamp}\nIP: ${ip || 'Unknown'}` },
        },
      },
    }));
    console.log('Lead notification sent to:', notificationEmail);
  } catch (err) {
    console.error('Failed to send lead notification:', err.message);
  }
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Waitlist signup
app.post('/api/waitlist', async (req, res) => {
  const { email, source } = req.body;
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const result = await pool.query(
      'INSERT INTO waitlist (email, source, ip_address) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING id',
      [normalizedEmail, source || 'website', ip]
    );

    // Only send emails if this is a new signup (not a duplicate)
    if (result.rowCount > 0) {
      // Send emails asynchronously (don't block response)
      Promise.all([
        sendWelcomeEmail(normalizedEmail),
        sendLeadNotification(normalizedEmail, source || 'website', ip),
      ]).catch(console.error);
    }

    res.json({ success: true, message: 'Added to waitlist' });
  } catch (err) {
    console.error('Waitlist error:', err);
    res.status(500).json({ error: 'Failed to add to waitlist' });
  }
});

// Newsletter signup (same flow as waitlist)
app.post('/api/newsletter', async (req, res) => {
  const { email, source } = req.body;
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const result = await pool.query(
      'INSERT INTO waitlist (email, source, ip_address) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING id',
      [normalizedEmail, source || 'newsletter', ip]
    );

    if (result.rowCount > 0) {
      Promise.all([
        sendWelcomeEmail(normalizedEmail),
        sendLeadNotification(normalizedEmail, source || 'newsletter', ip),
      ]).catch(console.error);
    }

    res.json({ success: true, message: 'Subscribed to newsletter' });
  } catch (err) {
    console.error('Newsletter error:', err);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Support form submission
app.post('/api/support', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!subject || !subject.trim()) {
    return res.status(400).json({ error: 'Subject is required' });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const supportEmail = process.env.SUPPORT_EMAIL || process.env.NOTIFICATION_EMAIL || 'app-account@triple3v.org';

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.FROM_EMAIL) {
    console.log('SES not configured, skipping support emails');
    return res.json({ success: true, message: 'Message received' });
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Send notification to support team
    await ses.send(new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [supportEmail],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `[Support] ${subject}` },
        Body: {
          Html: { Data: getSupportRequestHtml(name, email, subject, message, timestamp, ip) },
          Text: { Data: `New Support Request\n\nFrom: ${name} <${email}>\nSubject: ${subject}\nTime: ${timestamp}\nIP: ${ip || 'Unknown'}\n\nMessage:\n${message}` },
        },
      },
    }));
    console.log('Support notification sent to:', supportEmail);

    // Send auto-reply to user
    await ses.send(new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: { Data: "We received your message — Figwork" },
        Body: {
          Html: { Data: getSupportAutoReplyHtml(name) },
          Text: { Data: `Hi ${name.split(' ')[0]},\n\nThank you for reaching out to Figwork. We've received your message and a member of our team will get back to you shortly.\n\nIn the meantime, feel free to reply to this email if you have any additional information to share.\n\n— The Figwork Team` },
        },
      },
    }));
    console.log('Support auto-reply sent to:', email);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Support error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start server
initDb().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize:', err);
  process.exit(1);
});
