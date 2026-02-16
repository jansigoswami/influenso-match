import React, { useState } from "react";
import NavBar from "@/components/NavBar";

import { supabase } from "../lib/supabaseClient";

type InfluencerForm = {
  name: string;
  email: string;
  handle: string;
  platform: string;
  followers: string;
  password: string;
  bio: string;
  profileUrl: string;
  portfolioUrl: string;
  agree: boolean;
};

const initialForm: InfluencerForm = {
  name: "",
  email: "",
  handle: "",
  platform: "",
  followers: "",
  password: "",
  bio: "",
  profileUrl: "",
  portfolioUrl: "",
  agree: false,
};

export default function Influencer(): JSX.Element {
  const [form, setForm] = useState<InfluencerForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof InfluencerForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange<K extends keyof InfluencerForm>(key: K, value: InfluencerForm[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof InfluencerForm, string>> = {};

    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.handle.trim()) next.handle = "Social handle is required";
    if (!form.platform) next.platform = "Select a platform";
    if (form.followers && !/^\d+$/.test(form.followers)) next.followers = "Enter a whole number";
    if (!form.password.trim()) next.password = "Password is required";
    if (!form.bio.trim()) next.bio = "Short bio is required";
    if (!form.agree) next.agree = "You must agree to the terms";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("user_influencer")
        .insert([
          {
            full_name: form.name,
            email: form.email,
            social_handle: form.handle,
            primary_platform: form.platform,
            followers: form.followers ? parseInt(form.followers, 10) : null,
            category: form.password,
            bio: form.bio,
            profile_url: form.profileUrl,
            portfolio: form.portfolioUrl,
            agree_to_share: form.agree,
          },
        ]);

      if (error) {
        throw error;
      }

      alert("Registration submitted successfully!");
      setForm(initialForm);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert("Submission failed — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="root">
      <NavBar />
      <section className="infoSubmit max-w-3xl mx-auto my-8 p-6 form-section">
        <h1 className="text-2xl font-semibold mb-4">Influencer Registration</h1>
        <p className="text-sm text-muted-foreground mb-6">Create your influencer profile so brands can find and match with you.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Full name</span>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Jane Doe"
              />
                {errors.name && <span className="form-error">{errors.name}</span>}
            </label>

            <label className="flex flex-col">
              <span className="form-label">Email</span>
              <input
                className="form-input"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                type="email"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Social handle</span>
              <input
                className="form-input"
                value={form.handle}
                onChange={(e) => handleChange("handle", e.target.value)}
                placeholder="@janedoe"
              />
              {errors.handle && <span className="form-error">{errors.handle}</span>}
            </label>

            <label className="flex flex-col">
              <span className="form-label">Primary platform</span>
              <select
                className="form-select"
                value={form.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
              >
                <option value="">Choose platform</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="twitch">Twitch</option>
                <option value="other">Other</option>
              </select>
              {errors.platform && <span className="form-error">{errors.platform}</span>}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Followers / Subscribers</span>
              <input
                className="form-input"
                value={form.followers}
                onChange={(e) => handleChange("followers", e.target.value)}
                placeholder="e.g., 12000"
                inputMode="numeric"
              />
              {errors.followers && <span className="form-error">{errors.followers}</span>}
            </label>

            <label className="flex flex-col">
              <span className="form-label">Password</span>
              <input
                className="form-input"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                type="password"
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </label>
          </div>

          <label className="flex flex-col">
            <span className="form-label">Short bio</span>
            <textarea
              className="form-textarea min-h-[100px]"
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell brands what makes you unique"
            />
            {errors.bio && <span className="form-error">{errors.bio}</span>}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="form-label">Profile image URL</span>
              <input
                className="form-input"
                value={form.profileUrl}
                onChange={(e) => handleChange("profileUrl", e.target.value)}
                placeholder="https://..."
              />
            </label>

            <label className="flex flex-col">
              <span className="form-label">Portfolio / Link</span>
              <input
                className="form-input"
                value={form.portfolioUrl}
                onChange={(e) => handleChange("portfolioUrl", e.target.value)}
                placeholder="Website, Linktree, etc."
              />
            </label>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => handleChange("agree", e.target.checked)}
            />
            <span className="text-sm">I agree to share my profile with brands</span>
          </label>
          {errors.agree && <div className="form-error">{errors.agree}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" onClick={handleSubmit} disabled={submitting} className="btn-primary">
              {submitting ? "Submitting..." : "Register"}
            </button>

            <button type="button" onClick={() => setForm(initialForm)} className="btn-ghost">Reset</button>
          </div>
        </form>
      </section>
    </div>
  );
}
