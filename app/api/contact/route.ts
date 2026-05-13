import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getResend = async () => {
  const { Resend } = await import("resend");
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(apiKey);
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      company,
      country,
      businessType,
      projectType,
      quantity,
      timeline,
      productInterest,
      specifications,
      name,
      email,
      phone,
      message,
      locale,
      _hp,
    } = body ?? {};

    // Honeypot — silently succeed for bots.
    if (typeof _hp === "string" && _hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!company || !email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const html = `
<h2>New Inquiry from VistaFrame Website</h2>
<p><strong>Locale:</strong> ${locale ?? "n/a"}</p>

<h3>Company Information</h3>
<ul>
  <li><strong>Company:</strong> ${company}</li>
  <li><strong>Country:</strong> ${country || "Not specified"}</li>
  <li><strong>Business Type:</strong> ${businessType || "Not specified"}</li>
</ul>

<h3>Project Details</h3>
<ul>
  <li><strong>Project Type:</strong> ${projectType || "Not specified"}</li>
  <li><strong>Quantity:</strong> ${quantity || "Not specified"}</li>
  <li><strong>Timeline:</strong> ${timeline || "Not specified"}</li>
</ul>

<h3>Product Interest</h3>
<ul>
  <li><strong>Product Category:</strong> ${productInterest || "Not specified"}</li>
  <li><strong>Specifications:</strong> ${specifications || "None provided"}</li>
</ul>

<h3>Contact Information</h3>
<ul>
  <li><strong>Name:</strong> ${name}</li>
  <li><strong>Email:</strong> ${email}</li>
  <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
</ul>

<h3>Additional Message</h3>
<p>${message || "None provided"}</p>

<hr />
<p><em>Submitted via vistaframe.com</em></p>
`.trim();

    if (!process.env.RESEND_API_KEY) {
      console.log("[contact:dev-mode]", { company, email, name, locale });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = await getResend();
    const { error } = await resend.emails.send({
      from:
        process.env.LEAD_EMAIL_FROM || "VistaFrame <inquiry@vistaframe.com>",
      to: [process.env.LEAD_EMAIL_TO || "info@vistaframe.com"],
      subject: `New Inquiry: ${company} — ${productInterest || "General"}`,
      html,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
