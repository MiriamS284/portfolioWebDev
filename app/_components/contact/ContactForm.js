"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/app/_context/LanguageProvider";

const createSchema = (lang) =>
  z.object({
    firstName: z
      .string()
      .min(2, lang === "de" ? "Mindestens 2 Zeichen" : "At least 2 characters"),
    lastName: z
      .string()
      .min(2, lang === "de" ? "Mindestens 2 Zeichen" : "At least 2 characters"),
    company: z.string().optional(),
    email: z
      .string()
      .email(
        lang === "de" ? "Ungültige E-Mail-Adresse" : "Invalid email address",
      ),
    message: z
      .string()
      .min(
        10,
        lang === "de" ? "Mindestens 10 Zeichen" : "At least 10 characters",
      ),
  });

const texts = {
  de: {
    title: "Lass uns zusammen arbeiten",
    firstName: "Vorname",
    lastName: "Nachname",
    company: "Unternehmen",
    companyOptional: "optional",
    email: "E-Mail",
    emailHint: "email ist immer noch in",
    message: "Nachricht",
    messagePlaceholder: "Erzähl mir von deinem Projekt...",
    submit: "Nachricht senden",
    sending: "Wird gesendet...",
    success:
      "Nachricht gesendet! Wie schön, ich freue mich auf darauf und werde mich zeitnah bei Dir zurückmelden!",
    error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
  en: {
    title: "Let's work together",
    firstName: "First name",
    lastName: "Last name",
    company: "Company",
    companyOptional: "optional",
    email: "Email",
    emailHint: "email is still in",
    message: "Message",
    messagePlaceholder: "Tell me about your project...",
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent! Thank you! I'll get back to you soon.",
    error: "Something went wrong. Please try again.",
  },
};

export default function ContactForm() {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSchema(lang)),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <h2
        className="text-2xl md:text-3xl font-bold mb-8"
        style={{ color: "var(--ink)" }}
      >
        {t.title}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="firstName"
            label={t.firstName}
            error={errors.firstName}
            register={register}
          />

          <FormField
            id="lastName"
            label={t.lastName}
            error={errors.lastName}
            register={register}
          />
        </div>

        <FormField
          id="company"
          label={t.company}
          optional={t.companyOptional}
          register={register}
        />

        <FormField
          id="email"
          label={t.email}
          type="email"
          hint={t.emailHint}
          error={errors.email}
          register={register}
        />

        <FormField
          id="message"
          label={t.message}
          type="textarea"
          placeholder={t.messagePlaceholder}
          error={errors.message}
          register={register}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="text-sm font-mono transition-colors"
            style={{
              color: status === "sending" ? "var(--muted)" : "var(--accent)",
            }}
          >
            {status === "sending" ? t.sending : t.submit} →
          </button>
        </div>

        {status === "success" && (
          <p className="text-sm" style={{ color: "var(--accent)" }}>
            {t.success}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm" style={{ color: "tomato" }}>
            {t.error}
          </p>
        )}
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  type = "text",
  hint,
  optional,
  placeholder,
  error,
  register,
}) {
  const isTextarea = type === "textarea";
  const hasError = !!error;

  return (
    <div className="group/field">
      <label
        htmlFor={id}
        className={`block text-sm font-mono mb-2 transition-colors duration-200 ${
          hasError ? "" : "group-focus-within/field:text-[var(--ink)]"
        }`}
        style={{ color: hasError ? "tomato" : "var(--muted)" }}
      >
        {label}
        {optional && <span style={{ opacity: 0.5 }}> ({optional})</span>}
        {hint && (
          <span style={{ opacity: hasError ? 0.7 : 0.4, fontStyle: "italic" }}>
            {" "}
            — {hint}
          </span>
        )}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder}
          {...register(id)}
          className={`w-full px-0 py-3 bg-transparent text-base border-0 border-b transition-all duration-200 resize-none focus:outline-none focus-visible:outline-none ${
            hasError
              ? "border-b-[tomato]"
              : "border-b-[var(--border)] focus:border-b-[var(--ink)] focus:border-b-2"
          }`}
          style={{
            color: "var(--ink)",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          autoComplete={
            id === "firstName"
              ? "given-name"
              : id === "lastName"
                ? "family-name"
                : id === "company"
                  ? "organization"
                  : id === "email"
                    ? "email"
                    : "off"
          }
          {...register(id)}
          className={`w-full px-0 py-3 bg-transparent text-base border-0 border-b transition-all duration-200 focus:outline-none focus-visible:outline-none ${
            hasError
              ? "border-b-[tomato]"
              : "border-b-[var(--border)] focus:border-b-[var(--ink)] focus:border-b-2"
          }`}
          style={{
            color: "var(--ink)",
          }}
        />
      )}

      {hasError && (
        <p className="text-xs mt-2 font-mono" style={{ color: "tomato" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}
