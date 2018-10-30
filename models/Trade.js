const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const moment = require("moment")
const time = moment()


const tradeSchema = new Schema({
  img: {
    type: String,
    default: ""
    },
  businessName: {
    type: String,
    default: ""
    },
    job: {
        type:String,
        default: ""
    },
    businessDescription: {
        type: String,
        default: ""
    },
    businessPhone: {
        type: String,
        default: ""
    },
    businessEmail: {
        type: String,
        default: "",
        unique: true
    },
    businessAddress: {
      type: mongoose.Schema.Types.Mixed, default: {}
     //type: Object, default: {}
    },
    user_id:{
        type: Schema.Types.ObjectId, ref:'register'
      },
    geoPosition: {
        type: mongoose.Schema.Types.Mixed, default: {}
    },
  time: {
    type: String,
    default: time.format("dddd, MMMM Do YYYY, h:mm:ss a")}
})
module.exports = mongoose.model("trade", tradeSchema)