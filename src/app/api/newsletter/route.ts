import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailRegex, normalizeEmail, escapeHtml } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body?.email ?? "");

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo válido." },
        { status: 400 },
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (toEmail) {
      const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      await resend.emails.send({
        from: `Newsletter <${fromEmail}>`,
        to: toEmail,
        subject: `Nueva suscripción al newsletter`,
        html: `<p>Nueva persona suscrita al newsletter:</p><p><strong>${escapeHtml(email)}</strong></p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Ocurrió un error. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
