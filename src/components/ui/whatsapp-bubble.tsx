"use client";

import { motion } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";

export function WhatsAppBubble({ number }: { number: string }) {
  const clean = number.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Hola Leidy, me gustaría conocer más sobre tus servicios.",
  );
  const href = `https://wa.me/${clean}?text=${message}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 0.8 }}
      />
      <WhatsappLogo size={26} weight="fill" />
    </motion.a>
  );
}
