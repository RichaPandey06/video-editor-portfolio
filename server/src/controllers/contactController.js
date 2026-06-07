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

        // Save to MongoDB
        const contact = await Contact.create({ name, email, message });

        // Send email notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,

            subject: `🎬 New Portfolio Inquiry from ${name}`,

            html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; line-height: 1.6; color: #333;">
  
  <div style="max-width: 500px; margin: 0 auto; background: white;">
    
    <!-- Header -->
    <div style="background: linear-gradient(to right, #7c3aed, #a855f7); padding: 16px 20px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">New Inquiry Received</h1>
    </div>

    <!-- Content -->
    <div style="padding: 16px 20px;">

      <!-- From Section -->
      <div style="margin-bottom: 12px; padding: 10px; background: #f9f9f9; border-left: 3px solid #7c3aed; border-radius: 4px;">
        <p style="margin: 0 0 4px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
        <p style="margin: 0 0 2px 0; font-weight: 600; color: #1a1a2e;">${name}</p>
        <p style="margin: 0; color: #7c3aed; font-size: 12px;">${email}</p>
      </div>

      <!-- Message Section -->
      <div style="margin-bottom: 14px;">
        <p style="margin: 0 0 6px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Message</p>
        <p style="margin: 0; padding: 10px; background: #fafafa; border-left: 3px solid #f59e0b; border-radius: 4px; line-height: 1.5;">
          ${message}
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 14px 0;">
        <a href="mailto:${email}" style="display: inline-block; padding: 8px 20px; background: #7c3aed; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 12px;">
          Reply
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f5f5f5; padding: 10px 20px; text-align: center; border-top: 1px solid #e5e5e5; font-size: 11px; color: #999;">
      Portfolio Contact System
    </div>

  </div>

</body>
</html>
            `,
        });

        res.status(201).json({ success: true, contact });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  createContact,
  getContacts,
};