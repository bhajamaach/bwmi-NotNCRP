import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          subtle: "var(--bg-subtle)"
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)"
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
          bold: "var(--line-bold)"
        },
        navy: {
          DEFAULT: "var(--navy)",
          hover: "var(--navy-hover)"
        },
        urgent: {
          DEFAULT: "var(--urgent)"
        },
        error: {
          DEFAULT: "var(--error)"
        },
        amber: {
          DEFAULT: "var(--amber)"
        },
        teal: {
          DEFAULT: "var(--teal)"
        }
      },
      borderRadius: {
        input: "8px",
        control: "10px",
        card: "12px"
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "Noto Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "var(--font-mono)",
          "SFMono-Regular",
          "Consolas",
          "monospace"
        ]
      }
    }
  },
  plugins: []
};

export default config;
