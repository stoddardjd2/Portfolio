import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
const EMAIL = "Jared.stoddard2@gmail.com";
// https://dashboard.emailjs.com/admin
export default function ContactModal({ open, onClose }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setCopied(false);
    }
  }, [open]);

  if (!open) return null;

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      sethCopied(true);
      setTimeout(() => setCopied(false), 3600);
    } catch {
      /* silently fail */
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 shadow-xl">
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Email Me</h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Email + copy */}
          <div className="mt-0 flex items-center gap-2">
            <span className="text-sm text-neutral-300 select-all">
              {EMAIL}
            </span>

            <button
              type="button"
              onClick={copyEmail}
              className="h-7 px-2.5 rounded border border-white/10
                text-xs text-neutral-300 hover:text-white
                hover:border-white/20 transition"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={sendEmail} className="p-5 space-y-3">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full h-10 rounded bg-neutral-900 border border-white/10 px-3 text-white"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="w-full h-10 rounded bg-neutral-900 border border-white/10 px-3 text-white"
          />

          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your message"
            className="w-full rounded bg-neutral-900 border border-white/10 p-3 text-white resize-none"
          />

          {status === "error" && (
            <p className="text-sm text-red-400">
              Failed to send. Try again.
            </p>
          )}

          {status === "sent" ? (
            <p className="text-sm text-emerald-400">
              Message sent ✓
            </p>
          ) : (
            <button
              disabled={status === "sending"}
              className="h-10 px-4 rounded bg-white text-neutral-950 text-sm font-medium hover:bg-neutral-200 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
