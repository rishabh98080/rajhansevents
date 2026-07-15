"use client";

import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

export default function CalendlyButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PopupButton
      url="https://calendly.com/rajhanshevents/consultation"
      rootElement={document.body}
      text="Book an Appointment"
      className="btn btn-primary"
    />
  );
}