import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified domain. During development with Resend's sandbox,
// onboarding@resend.dev works without a custom domain.
const FROM = process.env.EMAIL_FROM || "Abandoned Japan <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@abandoned-japan.com";
const SITE_URL = process.env.NEXTAUTH_URL || "http://localhost:3001";

// ─── Welcome Email ────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to Abandoned Japan 🏝",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f4f1ea;font-family:Inter,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e0dbd0;">

              <!-- Header -->
              <tr>
                <td style="background:#43523d;padding:32px 40px;text-align:center;">
                  <p style="color:#facc15;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Remote Island Conservation</p>
                  <h1 style="color:#ffffff;font-size:26px;margin:0;font-weight:700;">Abandoned Japan</h1>
                  <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:6px 0 0;font-style:italic;">離島を生き返らせる。</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <p style="color:#43523d;font-size:16px;margin:0 0 16px;">Konichiwa, ${name} 👋</p>
                  <p style="color:#43523d;font-size:15px;line-height:1.7;margin:0 0 24px;">
                    You're now part of a network of people working to revive Japan's most vulnerable remote islands.
                    Whether you have a week to volunteer or a lifetime to commit — you belong here.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                    <tr>
                      <td style="background:#f4f1ea;border-radius:12px;padding:20px;">
                        <p style="color:#43523d;font-size:13px;font-weight:600;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">Start exploring</p>
                        <p style="margin:6px 0;"><a href="${SITE_URL}/islands" style="color:#a97a5e;text-decoration:none;font-size:14px;">🏝 Browse remote islands</a></p>
                        <p style="margin:6px 0;"><a href="${SITE_URL}/akiya" style="color:#a97a5e;text-decoration:none;font-size:14px;">🏚 Find an akiya home</a></p>
                        <p style="margin:6px 0;"><a href="${SITE_URL}/projects" style="color:#a97a5e;text-decoration:none;font-size:14px;">🌿 Join a conservation project</a></p>
                        <p style="margin:6px 0;"><a href="${SITE_URL}/species" style="color:#a97a5e;text-decoration:none;font-size:14px;">🐇 Discover endemic species</a></p>
                      </td>
                    </tr>
                  </table>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <a href="${SITE_URL}/islands" style="display:inline-block;background:#facc15;color:#43523d;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:100px;">
                          Explore Islands →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f4f1ea;padding:20px 40px;text-align:center;border-top:1px solid #e0dbd0;">
                  <p style="color:#a97a5e;font-size:11px;margin:0;">
                    © 2025 Abandoned Japan · Not just listings. Lifelines.
                  </p>
                  <p style="color:#c9bfb0;font-size:11px;margin:4px 0 0;">
                    You're receiving this because you created an account at abandonedjapan.network
                  </p>
                </td>
              </tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ─── Contact Confirmation (to sender) ────────────────────────────────────────

export async function sendContactConfirmation(to: string, name: string, message: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "We received your message — Abandoned Japan",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f4f1ea;font-family:Inter,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e0dbd0;">
              <tr>
                <td style="background:#43523d;padding:28px 40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:700;">Abandoned Japan</h1>
                  <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:4px 0 0;font-style:italic;">離島を生き返らせる。</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <p style="color:#43523d;font-size:15px;margin:0 0 16px;">Hi ${name},</p>
                  <p style="color:#43523d;font-size:15px;line-height:1.7;margin:0 0 24px;">
                    Thanks for reaching out. We read every message and reply to all of them — usually within 48 hours.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                    <tr>
                      <td style="background:#f4f1ea;border-radius:12px;padding:20px;border-left:3px solid #43523d;">
                        <p style="color:#43523d;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Your message</p>
                        <p style="color:#5a6b54;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                  <p style="color:#a97a5e;font-size:13px;margin:0;">With care,<br><strong style="color:#43523d;">The Abandoned Japan Team</strong></p>
                </td>
              </tr>
              <tr>
                <td style="background:#f4f1ea;padding:16px 40px;text-align:center;border-top:1px solid #e0dbd0;">
                  <p style="color:#c9bfb0;font-size:11px;margin:0;">© 2025 Abandoned Japan · Not just listings. Lifelines.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ─── Contact Admin Notification ───────────────────────────────────────────────

export async function sendContactAdminNotification(data: {
  name: string;
  email: string;
  interest?: string;
  message: string;
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New contact: ${data.name} (${data.interest || "General"})`,
    html: `
      <div style="font-family:monospace;padding:24px;background:#f4f1ea;">
        <h2 style="color:#43523d;margin:0 0 16px;">New Contact Submission</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:6px 12px 6px 0;color:#a97a5e;font-size:13px;white-space:nowrap;">Name</td><td style="padding:6px 0;color:#43523d;font-size:13px;">${data.name}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#a97a5e;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:${data.email}" style="color:#43523d;">${data.email}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#a97a5e;font-size:13px;">Interest</td><td style="padding:6px 0;color:#43523d;font-size:13px;">${data.interest || "—"}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#ffffff;border-radius:8px;border-left:3px solid #43523d;">
          <p style="color:#5a6b54;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${data.message}</p>
        </div>
      </div>
    `,
  });
}

// ─── Story Submission (to sender) ─────────────────────────────────────────────

export async function sendStoryConfirmation(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Your story has been received — Abandoned Japan",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f4f1ea;font-family:Inter,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e0dbd0;">
              <tr>
                <td style="background:#43523d;padding:28px 40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:700;">Abandoned Japan</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <p style="color:#43523d;font-size:15px;margin:0 0 16px;">Thank you, ${name}.</p>
                  <p style="color:#43523d;font-size:15px;line-height:1.7;margin:0 0 16px;">
                    Your story has been received. Stories like yours are the heart of this network —
                    they show people what is actually possible when someone shows up for an island.
                  </p>
                  <p style="color:#43523d;font-size:15px;line-height:1.7;margin:0 0 24px;">
                    We review all submissions and may reach out if we'd like to feature your story on the site.
                  </p>
                  <p style="color:#a97a5e;font-size:13px;margin:0;">With gratitude,<br><strong style="color:#43523d;">The Abandoned Japan Team</strong></p>
                </td>
              </tr>
              <tr>
                <td style="background:#f4f1ea;padding:16px 40px;text-align:center;border-top:1px solid #e0dbd0;">
                  <p style="color:#c9bfb0;font-size:11px;margin:0;">© 2025 Abandoned Japan · Not just listings. Lifelines.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ─── Story Admin Notification ─────────────────────────────────────────────────

export async function sendStoryAdminNotification(data: {
  name: string;
  email: string;
  island: string;
  story: string;
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New community story: ${data.name} — ${data.island || "unknown island"}`,
    html: `
      <div style="font-family:monospace;padding:24px;background:#f4f1ea;">
        <h2 style="color:#43523d;margin:0 0 16px;">New Community Story</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:6px 12px 6px 0;color:#a97a5e;font-size:13px;">Name</td><td style="padding:6px 0;color:#43523d;font-size:13px;">${data.name}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#a97a5e;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:${data.email}" style="color:#43523d;">${data.email}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#a97a5e;font-size:13px;">Island</td><td style="padding:6px 0;color:#43523d;font-size:13px;">${data.island || "—"}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#ffffff;border-radius:8px;border-left:3px solid #43523d;">
          <p style="color:#5a6b54;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${data.story}</p>
        </div>
      </div>
    `,
  });
}
