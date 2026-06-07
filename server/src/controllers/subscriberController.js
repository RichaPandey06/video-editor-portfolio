const Subscriber = require("../models/Subscriber");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber =
      await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({
        message: "Email already subscribed",
      });
    }

    const subscriber =
      await Subscriber.create({
        email,
      });

    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 });

    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  subscribe,
  getSubscribers,
};