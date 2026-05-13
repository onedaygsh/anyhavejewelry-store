"use client";

import { useState, useRef } from "react";
import { Image, X, Upload, Loader2 } from "lucide-react";

interface ImagePreviewInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function ImagePreviewInput({
  value,
  onChange,
  placeholder = "Image URL",
  label,
  className = "",
}: ImagePreviewInputProps) {
  const [previewError, setPreviewError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setPreviewError(false);
    setUploadError("");
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      handleChange(data.url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setUploadError(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const showPreview = value && !previewError;

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs text-charcoal/60 mb-1">{label}</label>
      )}
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black/5 text-xs text-charcoal hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Upload className="w-3 h-3" />
              )}
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {uploadError && (
              <span className="text-xs text-red-500">{uploadError}</span>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        {showPreview ? (
          <div className="relative w-20 h-20 flex-shrink-0 border border-black/5 rounded overflow-hidden bg-stone">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => setPreviewError(true)}
            />
            <button
              type="button"
              onClick={() => handleChange("")}
              className="absolute top-0.5 right-0.5 p-0.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 flex-shrink-0 border border-black/5 rounded bg-stone flex flex-col items-center justify-center gap-1">
            <Image className="w-5 h-5 text-charcoal/20" />
            <span className="text-[10px] text-charcoal/30">No image</span>
          </div>
        )}
      </div>
    </div>
  );
}
