import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body: any = await request.json();
    const { name, email, message, subject: customSubject } = body;

    if (!env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY is not set in Cloudflare environment variables." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const subject = customSubject || `【T'Z Studio】お問い合わせ: ${name}様`;
    const textBody = `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`;
    const htmlBody = textBody.replace(/\n/g, "<br>");

    // 1. Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "T'Z Studio <contact@t-z-studio.com>",
      to: "info@t-z-studio.com",
      subject: subject,
      text: textBody,
      html: `<div>${htmlBody}</div>`,
      replyTo: email,
    });

    if (adminEmail.error) {
      return new Response(
        JSON.stringify({ status: "error", message: adminEmail.error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Send auto-reply to user
    const autoReplyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 60px 40px; background-color: #ffffff; color: #000000; border: 1px solid #f0f0f0; border-radius: 40px;">
        <div style="font-size: 24px; font-weight: 900; letter-spacing: -1.5px; margin-bottom: 60px; text-transform: uppercase; border-bottom: 4px solid #000; display: inline-block; padding-bottom: 4px;">T'Z Studio</div>
        
        <h1 style="font-size: 48px; font-weight: 900; line-height: 0.9; margin-bottom: 32px; text-transform: uppercase; letter-spacing: -2px;">
          Thank you<br/>for reaching out.
        </h1>
        
        <p style="font-size: 18px; line-height: 1.6; color: #000000; margin-bottom: 48px; font-weight: 500;">
          お問い合わせありがとうございます。<br/>
          内容を確認の上、担当者より折り返しご連絡させていただきます。
        </p>
        
        <div style="padding: 40px; background-color: #f8f8f8; border-radius: 24px; margin-bottom: 48px;">
          <div style="font-size: 11px; font-weight: 900; color: #999999; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px;">Inquiry Details</div>
          <div style="font-size: 15px; line-height: 1.8; color: #333333; font-weight: 400;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="margin-bottom: 60px;">
          <a href="https://t-z-studio.com" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 20px 40px; border-radius: 100px; text-decoration: none; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">Visit Website</a>
        </div>
        
        <div style="font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 40px; font-weight: 500;">
          <p style="margin-bottom: 8px;">© 2026 T'Z Studio. All rights reserved.</p>
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "T'Z Studio <info@t-z-studio.com>",
      to: email,
      subject: "【T'Z Studio】お問い合わせありがとうございます",
      html: autoReplyHtml,
    });

    return new Response(
      JSON.stringify({ status: "ok", data: adminEmail.data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: "error", message: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
