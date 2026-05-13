import Link from "next/link";
import { defaultLocale } from "@/content/i18n";

/** Root not-found used only when a path falls outside any [locale] tree. */
export default function RootNotFound() {
  return (
    <html lang={defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0f0f0f",
          color: "#f5f5f4",
        }}
      >
        <main style={{ textAlign: "center", padding: 24 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.32em",
              color: "#d4a853",
              textTransform: "uppercase",
            }}
          >
            VistaFrame
          </p>
          <h1 style={{ fontSize: 64, margin: "16px 0", fontWeight: 800 }}>404</h1>
          <p style={{ color: "#a8a29e" }}>The page you requested could not be found.</p>
          <p style={{ marginTop: 24 }}>
            <Link
              href={`/${defaultLocale}`}
              style={{
                color: "#0f0f0f",
                background: "#d4a853",
                padding: "10px 18px",
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Back to home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
