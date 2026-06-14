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
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: `🎬 New Portfolio Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          
          <div style="max-width:520px;margin:40px auto;background:#09090b;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
            
            <!-- Header -->
            <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:15px;font-weight:900;color:#fff;letter-spacing:-0.5px;">RICHA<span style="color:#52525b;">.EDITS</span></span>
              <span style="float:right;font-size:10px;font-family:monospace;color:#52525b;letter-spacing:0.2em;text-transform:uppercase;">New Inquiry</span>
            </div>

            <!-- Body -->
            <div style="padding:28px;">

              <!-- Title -->
              <p style="margin:0 0 20px;font-size:10px;font-family:monospace;color:#52525b;letter-spacing:0.3em;text-transform:uppercase;">Inbox</p>
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px;">New Message Received</h1>

              <!-- Sender card -->
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 20px;margin-bottom:16px;">
                <p style="margin:0 0 8px;font-size:10px;font-family:monospace;color:#52525b;letter-spacing:0.2em;text-transform:uppercase;">From</p>
                <div style="margin-top:8px;">
                  <div style="width:32px;height:32px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;display:inline-block;font-size:12px;font-weight:700;color:#a1a1aa;text-align:center;line-height:32px;margin-bottom:8px;">${name?.[0]?.toUpperCase() ?? '?'}</div>
                  <p style="margin:0;font-size:14px;font-weight:600;color:#fff;">${name}</p>
                  <p style="margin:0;font-size:12px;color:#7c3aed;font-family:monospace;">${email}</p>
                </div>
              </div>

              <!-- Message card -->
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
                <p style="margin:0 0 8px;font-size:10px;font-family:monospace;color:#52525b;letter-spacing:0.2em;text-transform:uppercase;">Message</p>
                <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.6;">${message}</p>
              </div>

              <!-- CTA -->
              <a href="mailto:${email}?subject=Re: Your Inquiry to Richa Edits" 
                style="display:block;text-align:center;padding:12px 24px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;letter-spacing:0.02em;">
                Reply to ${name}
              </a>

            </div>

            <!-- Footer -->
            <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;font-size:11px;font-family:monospace;color:#3f3f46;letter-spacing:0.1em;">richapandey.xyz · Portfolio Contact System</p>
            </div>

          </div>

        </body>
        </html>
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
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, deleteContact, markAsRead, replyContact };