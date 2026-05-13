"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

const initial = {
  company: "",
  country: "",
  businessType: "",
  projectType: "",
  quantity: "",
  timeline: "",
  productInterest: "",
  specifications: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  _hp: "",
};

export function ContactForm({ dict, locale }: Props) {
  const d = dict.contact;
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(initial);

  const update = (k: keyof typeof initial, v: string) =>
    setData((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch {
      /* noop */
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="rounded-none border-stone-200">
        <CardContent className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-950">
            {d.successTitle}
          </h3>
          <p className="mt-2 text-stone-600">{d.successBody}</p>
        </CardContent>
      </Card>
    );
  }

  const total = d.steps.length;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* honeypot */}
      <input
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        value={data._hp}
        onChange={(e) => update("_hp", e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {/* Progress */}
      <ol className="mb-6 flex items-center justify-between gap-1">
        {d.steps.map((s, i) => {
          const id = i + 1;
          const active = id === step;
          const done = id < step;
          return (
            <li key={s.title} className="flex flex-1 items-center gap-2">
              <div
                className={
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium " +
                  (done
                    ? "bg-[var(--accent-gold)] text-[var(--derchi-dark)]"
                    : active
                      ? "bg-[var(--derchi-dark)] text-white"
                      : "bg-stone-200 text-stone-500")
                }
              >
                {done ? <CheckCircle className="h-4 w-4" /> : id}
              </div>
              <span
                className={
                  "hidden text-[12px] font-semibold uppercase tracking-[0.14em] sm:inline " +
                  (active ? "text-neutral-950" : "text-stone-500")
                }
              >
                {s.title}
              </span>
              {i < total - 1 ? (
                <div className="ml-2 hidden h-px flex-1 bg-stone-200 sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <div className="space-y-4 animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">{d.fields.company}</Label>
              <Input
                id="company"
                required
                autoComplete="organization"
                value={data.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder={d.fields.company}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">{d.fields.country}</Label>
              <Select
                value={data.country}
                onValueChange={(v) => update("country", v)}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder={d.fields.countryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {d.options.countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessType">{d.fields.businessType}</Label>
            <Select
              value={data.businessType}
              onValueChange={(v) => update("businessType", v)}
            >
              <SelectTrigger className="rounded-none">
                <SelectValue placeholder={d.fields.businessTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {d.options.businessTypes.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="projectType">{d.fields.projectType}</Label>
            <Select
              value={data.projectType}
              onValueChange={(v) => update("projectType", v)}
            >
              <SelectTrigger className="rounded-none">
                <SelectValue placeholder={d.fields.projectTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {d.options.projectTypes.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">{d.fields.quantity}</Label>
              <Select
                value={data.quantity}
                onValueChange={(v) => update("quantity", v)}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder={d.fields.quantityPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {d.options.quantities.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">{d.fields.timeline}</Label>
              <Select
                value={data.timeline}
                onValueChange={(v) => update("timeline", v)}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder={d.fields.timelinePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {d.options.timelines.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="productInterest">{d.fields.productInterest}</Label>
            <Select
              value={data.productInterest}
              onValueChange={(v) => update("productInterest", v)}
            >
              <SelectTrigger className="rounded-none">
                <SelectValue placeholder={d.fields.productInterestPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {d.options.productInterests.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specifications">{d.fields.specifications}</Label>
            <Textarea
              id="specifications"
              value={data.specifications}
              onChange={(e) => update("specifications", e.target.value)}
              placeholder={d.fields.specificationsPlaceholder}
              rows={4}
              className="rounded-none"
            />
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4 animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{d.fields.name}</Label>
              <Input
                id="name"
                required
                autoComplete="name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={d.fields.namePlaceholder}
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{d.fields.email}</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={d.fields.emailPlaceholder}
                className="rounded-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{d.fields.phone}</Label>
            <Input
              id="phone"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder={d.fields.phonePlaceholder}
              className="rounded-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{d.fields.message}</Label>
            <Textarea
              id="message"
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={d.fields.messagePlaceholder}
              rows={3}
              className="rounded-none"
            />
          </div>
        </div>
      ) : null}

      <div className="flex justify-between border-t border-stone-200 pt-6">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-none border-stone-300"
          >
            {d.buttons.previous}
          </Button>
        ) : (
          <span />
        )}
        {step < total ? (
          <Button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-none bg-[var(--derchi-dark)] text-white hover:bg-neutral-800"
          >
            {d.buttons.next}
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={submitting}
            className="rounded-none bg-[var(--accent)] px-8 text-white hover:bg-[var(--accent-dark)]"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {d.buttons.submitting}
              </>
            ) : (
              d.buttons.submit
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
