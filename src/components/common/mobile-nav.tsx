"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
  order?: number;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-full p-2 text-neutral-700 transition hover:text-brand-500 md:hidden"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              <List size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-0 top-full w-full border-t border-brand-300/30 bg-brand-50/95 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex flex-col items-center gap-5 px-6 py-8 text-base font-medium text-neutral-700">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055 + 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="transition hover:text-brand-500"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: links.length * 0.055 + 0.05,
                  duration: 0.3,
                }}
                className="w-full pt-2"
              >
                <Button asChild className="w-full">
                  <Link href="/contacto" onClick={() => setIsOpen(false)}>
                    Agenda tu consulta
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
