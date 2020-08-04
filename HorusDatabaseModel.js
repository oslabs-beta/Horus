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
  requestId: {
    // type: Number,
    type: String,
    // required: true,
  },
  // serviceName: {
  //   type: String,
  //   required: true,
  // },
  // targetService: {
  //   type: String,
  //   required: true,
  // },
  methodName: {
    type: String,
    required: true,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  trace: {
    type: String,
    required: true,
  }
  // timestamp: {
  //   type: String,
  //   required: true,
  //   // default: Data.now
  // },
});

// create model and ship out
const horusModel = mongoose.model("horusModel", HorusSchema);

module.exports = horusModel;



// function makeMongooseConnection(mongoURL) {

//   const mongoose = require('mongoose');

//   const { Schema } = mongoose;

//   mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Horus Client Wrapper Connected to Database '))
//     .catch((error) => console.log('ERROR Horus Client Wrapper couldn\t connect to Database', error));

//   const RequestSchema = new Schema({
//     name: {
//       type: String,
//       required: true
//     }
//   });

//   const customerModel = mongoose.model('request', RequestSchema);

// }

// function log(message) {
//   console.log("logging message ", message);
// }

// module.exports = log;
