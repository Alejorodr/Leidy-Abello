// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import {
  emailRegex,
  sanitizeText,
  normalizeEmail,
  escapeHtml,
} from "@/lib/validation";

const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_dummy");

const maxNameLength = 200;
const maxEmailLength = 320;
const maxMessageLength = 5000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name: rawName, email: rawEmail, message: rawMessage, captchaToken } = body;

    // 1. Sanitize and Validate input
    if (!rawName || !rawEmail || !rawMessage) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 },
      );
    }

    const name = sanitizeText(rawName);
    const email = normalizeEmail(rawEmail);
    const message = sanitizeText(rawMessage);

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
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET;
    if (!hcaptchaSecret) {
      if (process.env.NODE_ENV === "production") {
        console.error("HCAPTCHA_SECRET is missing in production environment.");
        return NextResponse.json(
          { error: "Error de configuración del servidor." },
          { status: 500 },
        );
      }
      console.warn("hCaptcha validation skipped: HCAPTCHA_SECRET not set.");
    } else {
      if (!captchaToken) {
        return NextResponse.json(
          { error: "CAPTCHA requerido." },
          { status: 400 },
        );
      }

      const captchaValidationResponse = await fetch(
        "https://hcaptcha.com/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            response: captchaToken,
            secret: hcaptchaSecret,
          }).toString(),
        },
      );
      const captchaValidationData = await captchaValidationResponse.json();

      if (!captchaValidationData.success) {
        return NextResponse.json(
          { error: "CAPTCHA inválido." },
          { status: 400 },
        );
      }
    }

    // 3. Save lead to database
    await prisma.lead.create({
      data: {
        name,
        email,
        message,
      },
    });

    // 4. Send email notification
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!toEmail) {
      console.error("CONTACT_TO_EMAIL is missing.");
      return NextResponse.json(
        { error: "Error de configuración de notificaciones." },
        { status: 500 },
      );
    }

    try {
      const resend = getResend();
      const { error: emailError } = await resend.emails.send({
        from: `Contacto <${fromEmail}>`,
        to: toEmail,
        subject: "Nuevo mensaje de contacto",
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      });

      if (emailError) {
        console.error("Resend error:", emailError);
        return NextResponse.json(
          { error: "No se pudo enviar la notificación por correo." },
          { status: 500 },
        );
      }
    } catch (err) {
      console.error("Failed to send email via Resend:", err);
      return NextResponse.json(
        { error: "Ocurrió un error al enviar el correo." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "¡Mensaje enviado con éxito!",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor." },
      { status: 500 },
    );
  }
}
