import React, { useState } from "react";
import NavBar from "@/components/NavBar";

type BrandForm = {
  company: string;
  contactName: string;
  email: string;
  website: string;
  budget: string;
  brief: string;
  audience: string;
  location: string;
  agree: boolean;
};

const initialForm: BrandForm = {
  company: "",
  contactName: "",
  email: "",
  website: "",
  budget: "",
  brief: "",
  audience: "",
  location: "",
  agree: false,
};

export default function Brand(): JSX.Element {
  const [form, setForm] = useState<BrandForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BrandForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange<K extends keyof BrandForm>(key: K, value: BrandForm[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof BrandForm, string>> = {};
    if (!form.company.trim()) next.company = "Company name is required";
    if (!form.contactName.trim()) next.contactName = "Contact name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.budget.trim()) next.budget = "Provide a budget or range";
    if (!form.brief.trim()) next.brief = "Brief is required";
    if (!form.agree) next.agree = "You must agree to share campaign details";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 700));
      // eslint-disable-next-line no-console
      console.log("Brand submission:", form);
      alert("Campaign request submitted — check console for payload.");
      setForm(initialForm);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert("Submission failed — try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="root">
      <NavBar />

      <section className="max-w-3xl mx-auto p-6 my-8 form-section">
        <h1 className="text-2xl font-semibold mb-4">Brand / Agency Request</h1>
        <p className="text-sm text-muted-foreground mb-6">Tell us about your campaign so we can recommend the right influencers.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Company</span>
              <input className="form-input" value={form.company} onChange={(e) => handleChange("company", e.target.value)} placeholder="Your company or agency" />
              {errors.company && <span className="form-error">{errors.company}</span>}
            </label>

            <label className="flex flex-col">
              <span className="form-label">Contact name</span>
              <input className="form-input" value={form.contactName} onChange={(e) => handleChange("contactName", e.target.value)} placeholder="Full name" />
              {errors.contactName && <span className="form-error">{errors.contactName}</span>}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Email</span>
              <input className="form-input" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@company.com" type="email" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </label>

            <label className="flex flex-col">
              <span className="form-label">Website</span>
              <input className="form-input" value={form.website} onChange={(e) => handleChange("website", e.target.value)} placeholder="https://yourdomain.com" />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="form-label">Campaign brief</span>
            <textarea className="form-textarea min-h-[120px]" value={form.brief} onChange={(e) => handleChange("brief", e.target.value)} placeholder="Describe the campaign goals, deliverables, and timeline" />
            {errors.brief && <span className="form-error">{errors.brief}</span>}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Budget</span>
              <input className="form-input" value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} placeholder="e.g., ₹50k-100k or fixed amount" />
              {errors.budget && <span className="form-error">{errors.budget}</span>}
            </label>

            <label className="flex flex-col">
              <span className="form-label">Target audience</span>
              <input className="form-input" value={form.audience} onChange={(e) => handleChange("audience", e.target.value)} placeholder="e.g., 18-24, beauty enthusiasts, Indore" />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="form-label">Target location</span>
            <input className="form-input" value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="City or region" />
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.agree} onChange={(e) => handleChange("agree", e.target.checked)} />
            <span className="text-sm">I agree to share campaign details with the Influenso network</span>
          </label>
          {errors.agree && <div className="form-error">{errors.agree}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={submitting} onClick={handleSubmit} className="btn-primary">{submitting ? "Submitting..." : "Submit request"}</button>

            <button type="button" onClick={() => setForm(initialForm)} className="btn-ghost">Reset</button>
          </div>
        </form>
      </section>
    </div>
  );
}
