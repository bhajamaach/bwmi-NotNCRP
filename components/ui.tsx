"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export function PageSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12 ${className}`}>{children}</section>;
}

const buttonBase =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-control border px-5 py-3 font-medium transition-all duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

export const buttonPrimaryClass = `${buttonBase} border-navy bg-navy text-white hover:bg-navy-hover hover:shadow-md`;
export const buttonSecondaryClass = `${buttonBase} border-line bg-white text-navy hover:bg-bg-subtle hover:border-line-strong`;

/**
 * Shared "formal choice list" pattern (landing A/B/C, CategoryQA top-level and
 * nested sub-choice lists). Hairline border, row dividers stay light gray.
 */
export const choiceListClass = "divide-y divide-line rounded-card border-2 border-line-bold bg-white";
export const choiceRowClass =
  "group focus-ring flex w-full items-start gap-3 border-2 border-transparent text-left transition-all duration-150 hover:border-navy hover:bg-bg-subtle active:scale-[0.995]";
export const choiceRowSelectedClass = "border-navy bg-bg-subtle";

export function ChoiceLetter({
  letter,
  active = false,
  size = "md"
}: {
  letter: string;
  active?: boolean;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-6 w-6 text-xs" : "h-8 w-8 text-sm";
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border font-mono font-bold transition-all duration-150 ${sizeClass} ${
        active
          ? "border-navy bg-navy text-white"
          : "border-line-strong bg-white text-ink group-hover:border-navy group-hover:bg-navy group-hover:text-white group-hover:scale-110"
      }`}
    >
      {letter}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) {
  const variantClass = variant === "primary" ? buttonPrimaryClass : buttonSecondaryClass;
  return (
    <button className={`${variantClass} ${className}`} type={props.type ?? "button"} {...props}>
      {children}
    </button>
  );
}

export function PrimaryLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link className={`${buttonPrimaryClass} ${className}`} href={href}>
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link className={`${buttonSecondaryClass} ${className}`} href={href}>
      {children}
    </Link>
  );
}

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p className="animate-reveal mt-2 flex items-start gap-1.5 text-sm font-medium text-error" id={id} role="alert">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" name="alert" />
      <span>{children}</span>
    </p>
  );
}

export function RequiredMark() {
  return <span className="font-semibold text-error" aria-label="required"> *</span>;
}

export function FieldChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-input border-2 border-line-bold px-3 py-1.5 font-mono text-xl font-bold text-ink ${className}`}>
      {children}
    </span>
  );
}

export function CopyButton({ value, className = "" }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`focus-ring inline-flex items-center gap-1.5 rounded-control border px-3 py-1.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
        copied ? "border-teal bg-bg-subtle text-teal" : "border-line text-navy hover:bg-bg-subtle"
      } ${className}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        } catch {
          setCopied(false);
        }
      }}
      type="button"
    >
      {copied ? (
        <>
          <Icon className="h-3.5 w-3.5 animate-pop" name="check" />
          <span key="copied" className="animate-reveal">
            Copied
          </span>
        </>
      ) : (
        "Copy"
      )}
    </button>
  );
}
