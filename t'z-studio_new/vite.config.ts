import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { Resend } from 'resend';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'api-simulator',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/contact' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const { name, email, message, subject: customSubject } = JSON.parse(body);
                  const apiKey = env.RESEND_API_KEY;

                  if (!apiKey) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'RESEND_API_KEY is missing in preview environment.' }));
                    return;
                  }

                  const resend = new Resend(apiKey);
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
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: error.message }));
                  } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ status: 'ok', data }));
                  }
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: err.message }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
