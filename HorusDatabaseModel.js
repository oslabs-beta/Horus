const mongoose = require("mongoose");
require("dotenv").config();

const { Schema } = mongoose;

// DB link for horus tracer data.
const horus_db_uri = `${process.env.HORUS_DB}`;
// const horus_db_uri = 'mongodb+srv://tinyturtle2:horuspass@cluster0-4egmg.mongodb.net/horus?retryWrites=true&w=majority';

mongoose
  .connect(horus_db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log("Connected!!!********* Horus Database is live for Horus!!!")
  )
  .catch((err) => console.log("Connection Error ", err));

//  Schema for the database
const HorusSchema = new Schema({
  timestamp: {
    type: String,
    // default: moment(Date.now).format('MMMM Do YYYY, h:mm:ss a'),
  },
  methodName: {
    type: String,
    required: true,
  },
  error: {
    type: String,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  trace: {
    type: Object,
    required: true,
  },
});

const horusModel = mongoose.model("horusModel", HorusSchema);

module.exports = horusModel;