"use client";
import { ComponentPropsWithoutRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function FormStatusButton({
  disabled,
  children,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={disabled || pending} {...rest}>
      {pending ? "Pending..." : children}
    </button>
  );
}
