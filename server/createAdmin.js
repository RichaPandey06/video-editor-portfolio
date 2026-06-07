require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./src/models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashedPassword =
    await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin Created");

  process.exit();
}

createAdmin();