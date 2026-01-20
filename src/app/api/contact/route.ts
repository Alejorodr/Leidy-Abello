import { NextResponse } from "next/server";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";

async function verifyHcaptcha(token: string | null) {
  if (!token || !process.env.HCAPTCHA_SECRET) {
    return true;
  }

  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET,
      response: token,
    }),
  });

  const data = (await response.json()) as { success: boolean };
  return data.success;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");
  const hcaptchaToken = formData.get("hcaptchaToken")?.toString() ?? null;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const hcaptchaOk = await verifyHcaptcha(hcaptchaToken);

  if (!hcaptchaOk) {
    return NextResponse.json({ error: "hCaptcha inválido" }, { status: 400 });
  }

  if (process.env.DATABASE_URL) {
    await prisma.lead.create({
      data: {
        name,
        email,
        message,
      },
    });
  }

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Leidy Abello <no-reply@leidyabello.com>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: "Nuevo lead desde el sitio",
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    });
  }

  return NextResponse.json({ ok: true });
}
