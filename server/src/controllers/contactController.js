const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    // ✅ Respond immediately
    res.status(201).json({ success: true, contact });

    // Send email in background
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: `🎬 New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2>New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <a href="mailto:${email}" style="padding: 8px 16px; background: #7c3aed; color: white; text-decoration: none; border-radius: 4px;">Reply</a>
        </div>
      `,
    }).catch(err => console.error("Email failed:", err));

  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts };