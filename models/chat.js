const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSchema = new Schema({
  firstUser: { type: Schema.Types.ObjectId, ref: "User" },
  secondUser: { type: Schema.Types.ObjectId, ref: "User" }, 
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now },
});

chatSchema.index({firstUser: 1, secondUser: 1}, {unique: true, dropDups: true})

module.exports = mongoose.model("Chat", chatSchema);
