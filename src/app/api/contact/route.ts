// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { emailRegex } from "@/lib/validation";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

const maxNameLength = 200;
const maxEmailLength = 320;
const maxMessageLength = 5000;

export async function POST(request: Request) {
  try {
    const { name, email, message, captchaToken } = await request.json();

    // 1. Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 },
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El correo no es válido." },
        { status: 400 },
      );
    }

    if (
      name.length > maxNameLength ||
      email.length > maxEmailLength ||
      message.length > maxMessageLength
    ) {
      return NextResponse.json(
        { error: "Los datos exceden el tamaño permitido." },
        { status: 400 },
      );
    }

    // 2. Validate hCaptcha token
    const captchaValidationResponse = await fetch(
      "https://hcaptcha.com/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET}`,
      },
    );
    const captchaValidationData = await captchaValidationResponse.json();

    if (!captchaValidationData.success) {
      return NextResponse.json(
        { error: "CAPTCHA inválido." },
        { status: 400 },
      );
    }

    // 2. Save lead to database
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        message,
      },
    });

    // 3. Send email notification
    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (toEmail) {
      await resend.emails.send({
        from: `Contacto <no-reply@leidyabello.com>`,
        to: toEmail,
        subject: "Nuevo mensaje de contacto",
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
    } else {
      console.error(
        "CONTACT_TO_EMAIL no está definido. No se pudo enviar el email.",
      );
    }

    return NextResponse.json({
      message: "¡Mensaje enviado con éxito!",
      lead: newLead,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor." },
      { status: 500 },
    );
  }
}
