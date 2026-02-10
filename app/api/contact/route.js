import { NextResponse } from "next/server";

// TODO: Install resend and configure
// npm install resend
// Add RESEND_API_KEY to .env.local

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, company, email, message } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Uncomment when Resend is configured
    /*
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Contact Form <noreply@yourdomain.com>",
      to: "your-email@example.com",
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${firstName} ${lastName}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ""}
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    */

    // For now, just log the submission
    console.log("Contact form submission:", {
      firstName,
      lastName,
      company,
      email,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
