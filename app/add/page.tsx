"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Condition = "New" | "Good" | "Worn";
type Style = "Casual" | "Formal" | "Sport" | "Site";
type Category = "tops" | "bottoms" | "shoes";

interface FormState {
  name: string;
  condition: Condition | "";
  style: Style | "";
  category: Category | "";
}

const CONDITIONS: Condition[] = ["New", "Good", "Worn"];
const STYLES: Style[] = ["Casual", "Formal", "Sport", "Site"];
const CATEGORIES: Category[] = ["tops", "bottoms", "shoes"];

const conditionColors: Record<Condition, string> = {
  New: "border-green-400 bg-green-50 text-green-700",
  Good: "border-blue-400 bg-blue-50 text-blue-700",
  Worn: "border-amber-400 bg-amber-50 text-amber-700",
};

export default function AddItem() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", condition: "", style: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
    form.name.trim() && form.condition && form.style && form.category && file;

  const handleSubmit = async () => {
    if (!isValid || !file) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Upload image
      const path = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("clothing-images")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("clothing-images")
        .getPublicUrl(path);

      // 2. Insert row
      const { error: insertError } = await supabase.from("clothing_items").insert({
        name: form.name.trim(),
        condition: form.condition,
        style: form.style,
        category: form.category,
        image_url: urlData.publicUrl,
      });
      if (insertError) throw insertError;

      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto py-8 px-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Add Item</h1>
        </div>

        <div className="space-y-6">

          {/* Image upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Photo</label>

            {preview ? (
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain p-4"
                />
                <button
                  onClick={() => { setPreview(null); setFile(null); }}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs text-white hover:opacity-80"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors ${
                  dragging
                    ? "border-gray-400 bg-gray-100"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  📷
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Drop photo here</p>
                  <p className="text-xs text-gray-400 mt-0.5">or click to browse</p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="e.g. Blue Oxford Shirt"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-300 focus:border-gray-400 transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => set("category", c)}
                  className={`flex-1 rounded-xl border py-2.5 text-sm capitalize transition ${
                    form.category === c
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Condition</label>
            <div className="flex gap-2">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => set("condition", c)}
                  className={`flex-1 rounded-xl border py-2.5 text-sm transition ${
                    form.condition === c
                      ? `${conditionColors[c]} border-current`
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Style</label>
            <div className="grid grid-cols-4 gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => set("style", s)}
                  className={`rounded-xl border py-2.5 text-sm transition ${
                    form.style === s
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full rounded-xl bg-gray-900 py-3.5 text-sm font-medium text-white transition hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Item"}
          </button>

        </div>
      </div>
    </main>
  );
}