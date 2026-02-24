import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, company, email, message } = data;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // TODO: After domain verification, switch to:
    // from: "Miriam Sparbrod <contact@miriamsparbrod.dev>",
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "sparbrod.webdev@gmail.com",
      replyTo: email,
      subject: `miriamsparbrod.dev — ${firstName} ${lastName}${company ? ` (${company})` : ""}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ""}
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

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
      { status: 500 },
    );
  }
}
