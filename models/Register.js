const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")
const time = moment()

const RegisterSchema = new Schema({
  email: {type: String, default: "", unique: true},
  name: {type: String, default: ""},
  password: {type: String, default: ""},
  trade: [{ type: Schema.Types.ObjectId, ref:'trade' }],
  time: {type: String, default: time.format("dddd, MMMM Do YYYY, h:mm:ss a")}
})
module.exports = mongoose.model("register", RegisterSchema)