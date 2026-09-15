"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm text-black">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="mt-1 flex items-center gap-4">
        {url ? (
          <div className="relative size-16 overflow-hidden rounded-full border border-black/10">
            <Image src={url} alt="" fill sizes="64px" className="object-cover" />
          </div>
        ) : (
          <div className="flex size-16 items-center justify-center rounded-full border border-dashed border-black/20 text-xs text-muted">
            None
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full border border-brown px-4 py-1.5 text-sm text-brown transition-colors hover:bg-brown hover:text-white disabled:opacity-50"
          >
            {uploading ? "Uploading…" : url ? "Change image" : "Upload image"}
          </button>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}
