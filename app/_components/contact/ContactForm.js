"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState("idle");

  const PROJECT_TYPES = ["portal", "app", "ai", "website", "hosting", "existing", "open"];

  const schema = z.object({
    firstName: z.string().trim().min(2, t("validation.minChars", { count: 2 })),
    lastName: z.string().trim().min(2, t("validation.minChars", { count: 2 })),
    company: z.string().optional(),
    email: z.string().trim().email(t("validation.invalidEmail")),
    phone: z
      .string()
      .trim()
      .max(50)
      .regex(/^[+()\d\s/-]*$/, t("validation.phone"))
      .optional()
      .or(z.literal("")),
    projectType: z.enum(PROJECT_TYPES, { message: t("validation.required") }),
    message: z.string().trim().min(10, t("validation.minChars", { count: 10 })),
    privacy: z.literal(true, { message: t("validation.privacy") }),
    website: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      privacy: false,
      website: "",
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
    <div className="w-full">
      <h2
        className="text-xl font-semibold mb-8"
        style={{ color: "var(--ink)" }}
      >
        {t("title")}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot gegen Spam-Bots: für Menschen unsichtbar, nicht per Tab erreichbar */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register("website")}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="firstName"
            label={t("firstName")}
            error={errors.firstName}
            register={register}
          />

          <FormField
            id="lastName"
            label={t("lastName")}
            error={errors.lastName}
            register={register}
          />
        </div>

        <FormField
          id="company"
          label={t("company")}
          optional={t("companyOptional")}
          register={register}
        />

        <FormField
          id="email"
          label={t("email")}
          type="email"
          hint={t("emailHint")}
          error={errors.email}
          register={register}
        />

        <FormField
          id="phone"
          label={t("phone")}
          optional={t("companyOptional")}
          type="tel"
          error={errors.phone}
          register={register}
        />

        <SelectField
          id="projectType"
          label={t("projectType")}
          placeholder={t("projectTypePlaceholder")}
          options={PROJECT_TYPES.map((value) => ({
            value,
            label: t(`projectTypes.${value}`),
          }))}
          error={errors.projectType}
          register={register}
        />

        <FormField
          id="message"
          label={t("message")}
          type="textarea"
          placeholder={t("messagePlaceholder")}
          error={errors.message}
          register={register}
        />

        <div>
          <label
            htmlFor="privacy"
            className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer"
            style={{ color: errors.privacy ? "tomato" : "var(--muted)" }}
          >
            <input
              id="privacy"
              type="checkbox"
              {...register("privacy")}
              className="mt-1 shrink-0 accent-[var(--accent)]"
            />
            <span>
              {t("privacyText")}{" "}
              <Link
                href="/privatepolicy"
                className="underline underline-offset-2 hover:text-[var(--accent)]"
              >
                {t("privacyLink")}
              </Link>
              .
            </span>
          </label>
          {errors.privacy && (
            <p className="text-xs mt-2 font-mono" style={{ color: "tomato" }}>
              {errors.privacy.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="text-sm font-mono transition-colors"
            style={{
              color: status === "sending" ? "var(--muted)" : "var(--accent)",
            }}
          >
            {status === "sending" ? t("sending") : t("submit")} →
          </button>
        </div>

        {status === "success" && (
          <p className="text-sm" style={{ color: "var(--accent)" }}>
            {t("success")}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm" style={{ color: "tomato" }}>
            {t("error")}
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
                    : id === "phone"
                      ? "tel"
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

function SelectField({ id, label, placeholder, options, error, register }) {
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
      </label>

      <select
        id={id}
        defaultValue=""
        {...register(id)}
        className={`w-full px-0 py-3 bg-transparent text-base border-0 border-b transition-all duration-200 focus:outline-none focus-visible:outline-none ${
          hasError
            ? "border-b-[tomato]"
            : "border-b-[var(--border)] focus:border-b-[var(--ink)] focus:border-b-2"
        }`}
        style={{ color: "var(--ink)" }}
      >
        <option value="" disabled style={{ background: "var(--bg)" }}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ background: "var(--bg)" }}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <p className="text-xs mt-2 font-mono" style={{ color: "tomato" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}
