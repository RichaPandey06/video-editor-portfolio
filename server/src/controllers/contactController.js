const Contact = require("../models/Contact");
const transporter = require("../config/mail");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const contact = await Contact.create({ name, email, message });
        
        // ✅ Respond immediately
        res.status(201).json({ success: true, contact });

        // Email in background — no await
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🎬 New Portfolio Inquiry from ${name}`,
            html: `...your existing html...`,
        }).catch(err => console.error("Email failed:", err));

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  createContact,
  getContacts,
};