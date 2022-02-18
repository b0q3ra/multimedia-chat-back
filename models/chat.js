const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSchema = new Schema({
  firstUser: { type: Schema.Types.ObjectId, ref: "User" },
  secondUser: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", chatSchema);
