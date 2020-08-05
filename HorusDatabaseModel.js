const mongoose = require('mongoose');
const { Schema } = mongoose;

<<<<<<< HEAD
let instance = null;
// this function creates a connection with the mongoDB once, and then returns that connection for subsequent invocations preventing duplicate connections
function connectWithDatabase(mongoURL) {
  if (instance !== null) return instance;
  mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
      console.log("Connected!!!********* Horus Database is live for Horus!!!")
    )
    .catch((err) => console.log("Connection Error ", err));
  const HorusSchema = new Schema({
    client :{
      type: String,
      required: true,
    },
    server :{
      type: String,
      required: true,
    },
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
  instance = mongoose.model("horusModel", HorusSchema);
  return instance;
}
=======
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
  flag: {
    type: Boolean,
    // default: false,
  }
});

const horusModel = mongoose.model("horusModel", HorusSchema);
>>>>>>> a690d2b3e6e28c0c4346d2294c55fff3b3947914

module.exports = connectWithDatabase;