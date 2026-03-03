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

    const { data, error } = await resend.emails.send({
      from: "T'Z Studio <contact@t-z-studio.com>",
      to: "info@t-z-studio.com",
      subject: subject,
      text: textBody,
      html: `<div>${htmlBody}</div>`,
      replyTo: email,
    });

    if (error) {
      return new Response(
        JSON.stringify({ status: "error", message: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: "ok", data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: "error", message: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
