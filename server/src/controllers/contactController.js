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
    res.status(201).json({ success: true, contact });

    resend.emails.send({
      from: "noreply@send.richapandey.xyz",
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

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const replyContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    const { replyText } = req.body;

    resend.emails.send({
     from: "noreply@send.richapandey.xyz",
      to: contact.email,
      subject: `Re: Your message to Richa Edits`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2>Reply from Richa Edits</h2>
          <p>Hi ${contact.name},</p>
          <p>${replyText}</p>
          <hr style="border-color: #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">Your original message: "${contact.message}"</p>
        </div>
      `,
    }).catch(err => console.error("Reply email failed:", err));

    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, deleteContact, markAsRead, replyContact };
