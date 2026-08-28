"use client";

import { useState } from "react";
import { formatDateTime } from "@/lib/status";
import type { Complaint, ThreadMessage } from "@/lib/types";

export function ComplaintThread({
  complaint,
  role,
  onSend
}: {
  complaint: Complaint;
  role: ThreadMessage["from"];
  onSend: (text: string) => Promise<unknown>;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const messages = complaint.messages ?? [];

  if (complaint.status === "RECEIVED") {
    return (
      <div className="border-2 border-line-bold rounded-card bg-white p-5">
        <h2 className="font-bold text-ink">Messages</h2>
        <p className="mt-1 text-ink-muted">
          This thread opens once the complaint is assigned to a Cyber Cell officer, so both sides can exchange updates directly.
        </p>
      </div>
    );
  }

  async function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await onSend(trimmed);
      setText("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border-2 border-line-bold rounded-card bg-white p-5">
      <h2 className="font-bold text-ink">Messages</h2>
      <p className="mt-1 text-sm text-ink-muted">Shared between you and the Cyber Cell officer working this complaint.</p>

      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-ink-muted">No messages yet.</p>
        ) : (
          messages.map((message) => {
            const isMine = message.from === role;
            return (
              <div className={`flex ${isMine ? "justify-end" : "justify-start"}`} key={message.id}>
                <div
                  className={`max-w-[80%] rounded-control border-2 px-3 py-2 ${
                    isMine ? "border-navy bg-navy text-white" : "border-line-bold bg-bg-subtle text-ink"
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-wide ${isMine ? "text-white/70" : "text-ink-muted"}`}>
                    {message.from === "citizen" ? "Citizen" : "Cyber Cell"}
                  </p>
                  <p className="mt-0.5 text-sm">{message.text}</p>
                  <p className={`mt-1 font-mono text-[11px] ${isMine ? "text-white/60" : "text-ink-muted"}`}>
                    {formatDateTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <textarea
          className="focus-ring min-h-16 w-full rounded-input border border-line bg-white px-3 py-2 text-sm text-ink"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder={role === "citizen" ? "Ask a question or share an update..." : "Reply to the citizen..."}
          value={text}
        />
        <button
          className="focus-ring self-end rounded-control border border-navy bg-navy px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-navy-hover active:scale-95 disabled:opacity-50"
          disabled={!text.trim() || sending}
          onClick={handleSend}
          type="button"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
