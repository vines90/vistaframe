import { NextResponse } from "next/server";

// Initialize Resend only when needed (not during build)
const getResend = async () => {
  const { Resend } = await import("resend");
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
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
    } = body;

    // Validate required fields
    if (!company || !email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format email content
    const emailContent = `
<h2>New Inquiry from VistaFrame Website</h2>

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

<hr>
<p><em>This inquiry was submitted via the VistaFrame website contact form.</em></p>
    `.trim();

    // Initialize Resend and send email
    const resend = await getResend();

    const { data, error } = await resend.emails.send({
      from: process.env.LEAD_EMAIL_FROM || "VistaFrame <inquiry@vistaframe.com>",
      to: [process.env.LEAD_EMAIL_TO || "info@vistaframe.com"],
      subject: `New Inquiry: ${company} - ${productInterest || "General"}`,
      html: emailContent,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
