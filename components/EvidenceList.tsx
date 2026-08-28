import { Icon } from "@/components/Icon";
import type { EvidenceFile } from "@/lib/types";

export function EvidenceList({ files }: { files: EvidenceFile[] }) {
  if (files.length === 0) return null;

  return (
    <ul className="mt-2 space-y-2 text-sm text-ink-muted">
      {files.map((file) => {
        const url = file.id ? `/api/evidence/${file.id}` : undefined;
        return (
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1" key={file.id ?? `${file.name}-${file.size}`}>
            {url && file.type.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" className="h-8 w-8 shrink-0 rounded-input border border-line object-cover" src={url} />
            ) : (
              <Icon className="h-4 w-4 shrink-0 text-navy" name="file" />
            )}
            <span className="flex items-center gap-2">{file.name}</span>
            {file.hash ? (
              <span className="font-mono text-xs text-teal" title={`SHA-256: ${file.hash}`}>
                SHA-256 {file.hash.slice(0, 12)}&hellip;
              </span>
            ) : null}
            {url ? (
              <a
                className="focus-ring rounded-control border border-line px-2 py-0.5 text-xs font-semibold text-navy hover:bg-bg-subtle"
                href={url}
                rel="noreferrer"
                target="_blank"
              >
                View
              </a>
            ) : (
              <span className="text-xs text-ink-muted">Not available to open</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
