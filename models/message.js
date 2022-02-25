const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  body: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Message", messageSchema);
