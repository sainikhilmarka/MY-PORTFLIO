"use client";

import { useEffect } from "react";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({
  open,
  onClose,
}: ContactModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="modal-label">Contact</p>
            <h3 id="contact-modal-title">Let&apos;s build a stronger portfolio presence.</h3>
          </div>
          <button
            className="modal-close"
            type="button"
            aria-label="Close contact modal"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <p className="modal-copy">
          Swap these placeholders with your real email, phone, LinkedIn, or booking
          link. The component is separated so you can expand it into a full form later.
        </p>

        <div className="contact-list">
          <a href="mailto:hello@example.com">
            <strong>Email</strong>
            <span>hello@example.com</span>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <strong>LinkedIn</strong>
            <span>linkedin.com/in/your-profile</span>
          </a>
          <div>
            <strong>Availability</strong>
            <span>Open for freelance, internships, and portfolio collaborations.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
