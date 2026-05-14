"use client";

import { useState } from "react";
import { emailRegex, normalizeEmail } from "@/lib/validation";
import { PaperPlaneTilt } from "@/components/ui/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeEmail(email);
    if (!emailRegex.test(normalized)) {
      setErrorMsg("Ingresa un correo válido.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setErrorMsg(data.error ?? "Intenta de nuevo.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Ocurrió un error.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-emerald-600">
        ¡Listo! Pronto recibirás contenido con intención. 🌿
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        className="flex-1 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Suscribirse"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        <PaperPlaneTilt size={18} weight="fill" />
      </button>
      {status === "error" && errorMsg && (
        <p className="absolute mt-12 text-xs text-rose-500">{errorMsg}</p>
      )}
    </form>
  );
}
