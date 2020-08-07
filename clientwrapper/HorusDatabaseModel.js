const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    flag: {
      type: Boolean,
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

module.exports = connectWithDatabase;