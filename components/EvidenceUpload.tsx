"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { extractText, findLikelyReference } from "@/lib/ocr";
import type { EvidenceFile } from "@/lib/types";

const acceptedTypes = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
// Evidence content is stored as a base64 data URI in the complaint record so
// it can actually be reopened later, not just fingerprinted. Base64 inflates
// size by ~33%, and the whole request has to stay under Vercel's fixed 4.5MB
// function payload limit — these caps keep real-world usage well inside that.
const maxFileSize = 2 * 1024 * 1024;
const maxTotalSize = 3 * 1024 * 1024;

function fileKey(file: { name: string; size: number }) {
  return `${file.name}-${file.size}`;
}

async function sha256Hex(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function EvidenceUpload({
  files,
  onChange,
  onDetectedReference
}: {
  files: EvidenceFile[];
  onChange: (files: EvidenceFile[] | ((prev: EvidenceFile[]) => EvidenceFile[])) => void;
  /** Called when OCR finds a likely transaction reference in an uploaded image. */
  onDetectedReference?: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const previewUrlsRef = useRef<Record<string, string>>({});
  const [, setPreviewVersion] = useState(0);
  const [ocrStatus, setOcrStatus] = useState<Record<string, "scanning" | "found" | "empty" | "error">>({});
  const [ocrMatches, setOcrMatches] = useState<Record<string, string>>({});

  useEffect(() => {
    return () => {
      Object.values(previewUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function addFiles(selected: File[]) {
    if (selected.length === 0) return;
    setError("");
    const invalid = selected.find((file) => !acceptedTypes.includes(file.type) || file.size > maxFileSize);
    if (invalid) {
      setError("Upload images or PDFs only, up to 2 MB each.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    const currentTotal = files.reduce((sum, file) => sum + file.size, 0);
    const addedTotal = selected.reduce((sum, file) => sum + file.size, 0);
    if (currentTotal + addedTotal > maxTotalSize) {
      setError(`Evidence for one complaint is capped at ${Math.round(maxTotalSize / 1024 / 1024)} MB combined.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const existingKeys = new Set(files.map((file) => fileKey(file)));
    const newlyAdded: File[] = [];
    const merged = [...files];
    selected.forEach((file) => {
      const key = fileKey(file);
      if (!existingKeys.has(key)) {
        merged.push({ name: file.name, size: file.size, type: file.type });
        existingKeys.add(key);
        newlyAdded.push(file);
      }
      if (file.type.startsWith("image/")) {
        if (previewUrlsRef.current[key]) URL.revokeObjectURL(previewUrlsRef.current[key]);
        previewUrlsRef.current[key] = URL.createObjectURL(file);
      }
    });
    setPreviewVersion((value) => value + 1);
    onChange(merged);
    if (inputRef.current) inputRef.current.value = "";

    // Fingerprint and read each newly added file in the background. These two
    // async updates land independently and out of order, so both use the
    // functional setState form — mapping over whatever the latest array is
    // at update time — instead of the stale `merged` snapshot, or whichever
    // one finishes second would silently overwrite the other's field.
    newlyAdded.forEach((file) => {
      const key = fileKey(file);
      sha256Hex(file)
        .then((hash) => {
          const hashedAt = new Date().toISOString();
          onChange((prev) => prev.map((item) => (fileKey(item) === key ? { ...item, hash, hashedAt } : item)));
        })
        .catch(() => {
          /* Hashing is a best-effort demo touch; the file remains listed without a hash. */
        });

      // Actually keep the file content (as a data URI) so it can be opened
      // later from the complaint/petition detail page — without this, only
      // the filename and hash ever survive past this browser tab.
      readAsDataUrl(file)
        .then((dataUrl) => {
          onChange((prev) => prev.map((item) => (fileKey(item) === key ? { ...item, dataUrl } : item)));
        })
        .catch(() => {
          /* If reading fails, the file stays listed without an openable copy. */
        });

      // Real OCR (Tesseract.js, in-browser) on images only — screenshots of a bank
      // debit SMS or transaction receipt often contain the UTR in plain text.
      if (file.type.startsWith("image/")) {
        setOcrStatus((prev) => ({ ...prev, [key]: "scanning" }));
        extractText(file)
          .then((text) => {
            const reference = findLikelyReference(text);
            if (reference) {
              setOcrMatches((prev) => ({ ...prev, [key]: reference }));
              setOcrStatus((prev) => ({ ...prev, [key]: "found" }));
            } else {
              setOcrStatus((prev) => ({ ...prev, [key]: "empty" }));
            }
          })
          .catch(() => {
            setOcrStatus((prev) => ({ ...prev, [key]: "error" }));
          });
      }
    });
  }

  function removeFile(file: EvidenceFile) {
    const key = fileKey(file);
    if (previewUrlsRef.current[key]) {
      URL.revokeObjectURL(previewUrlsRef.current[key]);
      delete previewUrlsRef.current[key];
      setPreviewVersion((value) => value + 1);
    }
    onChange(files.filter((item) => fileKey(item) !== key));
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-ink" htmlFor="evidence">
        Evidence upload <span className="font-normal text-ink-muted">(optional)</span>
      </label>
      <div
        className={`mt-2 rounded-card border border-dashed p-4 transition-colors duration-150 ${
          isDragging ? "border-navy bg-bg-subtle" : "border-line-strong bg-white"
        }`}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          addFiles(Array.from(event.dataTransfer.files ?? []));
        }}
      >
        <input
          accept="image/png,image/jpeg,image/webp,application/pdf"
          className="sr-only"
          id="evidence"
          multiple
          onChange={(event) => addFiles(Array.from(event.target.files ?? []))}
          ref={inputRef}
          type="file"
        />
        <button
          className="focus-ring inline-flex items-center gap-2 rounded-control border border-line px-4 py-2 font-semibold text-navy hover:bg-bg-subtle"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          <Icon name="upload" />
          Select evidence
        </button>
        <p className="mt-2 text-sm text-ink-muted">
          Screenshots, bank statement excerpts, or PDFs, up to 2 MB each (3 MB total). Drag files here or select them. Each file is
          fingerprinted with SHA-256 and scanned for a transaction reference right in your browser, then submitted with your complaint so
          you and the Cyber Cell can both open it later.
        </p>
        {error ? (
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-error">
            <Icon className="mt-0.5 h-4 w-4 shrink-0" name="alert" />
            <span>{error}</span>
          </p>
        ) : null}
        {files.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {files.map((file) => {
              const key = fileKey(file);
              const previewUrl = previewUrlsRef.current[key];
              return (
                <li className="flex items-start gap-2 text-sm text-ink-muted" key={key}>
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" className="mt-0.5 h-8 w-8 shrink-0 rounded-input border border-line object-cover" src={previewUrl} />
                  ) : (
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-navy" name="file" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block">
                      {file.name} <span className="font-mono">({Math.max(1, Math.round(file.size / 1024))} KB)</span>
                    </span>
                    {file.hash ? (
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-teal">
                        <Icon className="h-3.5 w-3.5 shrink-0" name="shield" />
                        <span className="truncate font-mono" title={`SHA-256: ${file.hash}`}>
                          SHA-256 {file.hash.slice(0, 12)}&hellip;
                        </span>
                      </span>
                    ) : (
                      <span className="mt-1 block text-xs text-ink-muted">Fingerprinting for chain-of-custody&hellip;</span>
                    )}
                    {ocrStatus[key] === "scanning" ? (
                      <span className="mt-1 block text-xs text-ink-muted">Scanning for a transaction reference&hellip;</span>
                    ) : ocrStatus[key] === "found" && ocrMatches[key] ? (
                      <span className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-ink-muted">
                          Detected possible reference: <span className="font-mono font-semibold text-ink">{ocrMatches[key]}</span>
                        </span>
                        {onDetectedReference ? (
                          <button
                            className="focus-ring rounded-control border border-line px-2 py-0.5 font-semibold text-navy hover:bg-bg-subtle"
                            onClick={() => onDetectedReference(ocrMatches[key])}
                            type="button"
                          >
                            Use it
                          </button>
                        ) : null}
                      </span>
                    ) : null}
                  </span>
                  <button
                    aria-label={`Remove ${file.name}`}
                    className="focus-ring shrink-0 rounded-control border border-line px-2 py-0.5 font-mono text-xs text-ink-muted hover:bg-bg-subtle"
                    onClick={() => removeFile(file)}
                    type="button"
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
