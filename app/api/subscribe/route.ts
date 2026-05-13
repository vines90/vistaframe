import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim();
    const locale = String(body?.locale ?? "en");

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (apiKey && audienceId) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        await resend.contacts.create({
          email,
          audienceId,
          unsubscribed: false,
        });
      } catch (err) {
        console.error("Resend subscribe error", err);
      }
    } else {
      // Dev / unconfigured: just log
      console.log("[subscribe]", { email, locale });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("subscribe error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
