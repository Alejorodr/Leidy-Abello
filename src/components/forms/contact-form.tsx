"use client";

import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
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
  const captchaRef = useRef<HCaptcha | null>(null);

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

    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          captchaToken: hcaptchaToken,
        }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (response.ok) {
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
    <Card className="p-8 md:p-10" hover={false}>
      <form
        ref={formRef}
        className="space-y-6"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-neutral-500" htmlFor="name">
            Nombre completo
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-neutral-500" htmlFor="email">
            Correo electrónico
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-neutral-500" htmlFor="message">
            ¿En qué puedo acompañarte?
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Cuéntame sobre tu intención..."
            required
          />
        </div>
        <input type="hidden" name="hcaptchaToken" value={hcaptchaToken} />
        {siteKey ? (
          <div className="overflow-hidden rounded-xl">
            <HCaptcha
              ref={captchaRef}
              sitekey={siteKey}
              onVerify={(token) => setHcaptchaToken(token)}
              onExpire={() => setHcaptchaToken("")}
            />
          </div>
        ) : null}
        <Button type="submit" size="lg" className="w-full md:w-fit" disabled={submitting}>
          {submitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}
        </Button>
        {successMessage ? (
          <p className="text-sm font-medium text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">{successMessage}</p>
        ) : null}
        {errorMessage ? (
          <p className="text-sm font-medium text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-100">{errorMessage}</p>
        ) : null}
        <p className="text-xs text-neutral-400 text-center">
          Protegemos tu privacidad. Tu información será tratada con absoluta confidencialidad.
        </p>
      </form>
    </Card>
  );
}
