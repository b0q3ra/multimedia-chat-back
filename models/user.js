const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    active: {type: Boolean, default: false}
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', async (next) => {
  const user = this
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async (password) => {
  const user = this
  return await bcrypt.compare(password, user.password)
}

module.exports = mongoose.model("User", userSchema);
