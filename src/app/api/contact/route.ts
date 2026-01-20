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

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();
  const hcaptchaToken = formData.get("hcaptchaToken")?.toString() ?? null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const maxNameLength = 200;
  const maxEmailLength = 320;
  const maxMessageLength = 5000;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  if (
    name.length > maxNameLength ||
    email.length > maxEmailLength ||
    message.length > maxMessageLength
  ) {
    return NextResponse.json({ error: "Datos demasiado largos" }, { status: 400 });
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

  if (!process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json(
      { error: "Missing CONTACT_TO_EMAIL env var" },
      { status: 500 }
    );
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const payload: Parameters<typeof resend.emails.send>[0] = {
      from: "Leidy Abello <no-reply@leidyabello.com>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: "Nuevo lead desde el sitio",
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    await resend.emails.send(payload);
  }

  return NextResponse.json({ ok: true });
}
