"use client";

import { useRef, useState } from "react";
import HCaptcha from "react-hcaptcha";

import { Button } from "@/components/ui/button";
import { emailRegex, sanitizeText } from "@/lib/validation";

const maxNameLength = 200;
const maxEmailLength = 320;
const maxMessageLength = 5000;

export function ContactForm() {
  const [hcaptchaToken, setHcaptchaToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const captchaRef = useRef<{ resetCaptcha: () => void } | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = sanitizeText(String(formData.get("name") ?? ""));
    const email = sanitizeText(String(formData.get("email") ?? ""))
      .toLowerCase()
      .trim();
    const message = sanitizeText(String(formData.get("message") ?? ""));

    if (!name || !email || !message) {
      setErrorMessage("Por favor completa todos los campos.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Ingresa un correo válido.");
      return;
    }

    if (
      name.length > maxNameLength ||
      email.length > maxEmailLength ||
      message.length > maxMessageLength
    ) {
      setErrorMessage("Los datos exceden el tamaño permitido.");
      return;
    }

    formData.set("hcaptchaToken", hcaptchaToken);

    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (response.ok && data.ok) {
        setSuccessMessage("Gracias, pronto te contactaré.");
        setErrorMessage("");
        formRef.current?.reset();
        setHcaptchaToken("");
        captchaRef.current?.resetCaptcha();
        return;
      }

      setErrorMessage(data.error ?? "No pudimos enviar el mensaje.");
      setSuccessMessage("");
    } catch (error) {
      console.error("Contact form submit failed", error);
      setErrorMessage("Ocurrió un error al enviar el mensaje.");
      setSuccessMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="card space-y-6"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">
          Nombre completo
        </label>
        <input
          className="w-full rounded-2xl border border-brand-300/40 bg-white px-4 py-3 text-sm"
          id="name"
          name="name"
          placeholder="Tu nombre"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Correo
        </label>
        <input
          className="w-full rounded-2xl border border-brand-300/40 bg-white px-4 py-3 text-sm"
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="message">
          Mensaje
        </label>
        <textarea
          className="min-h-[140px] w-full rounded-2xl border border-brand-300/40 bg-white px-4 py-3 text-sm"
          id="message"
          name="message"
          placeholder="Cuéntame sobre tu intención"
          required
        />
      </div>
      <input type="hidden" name="hcaptchaToken" value={hcaptchaToken} />
      {siteKey ? (
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onVerify={(token) => setHcaptchaToken(token)}
          onExpire={() => setHcaptchaToken("")}
        />
      ) : null}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
      {successMessage ? (
        <p className="text-sm text-emerald-600">{successMessage}</p>
      ) : null}
      {errorMessage ? (
        <p className="text-sm text-rose-600">{errorMessage}</p>
      ) : null}
      <p className="text-xs text-neutral-500">
        Protegemos tu información y solo la usamos para responder tu solicitud.
      </p>
    </form>
  );
}
