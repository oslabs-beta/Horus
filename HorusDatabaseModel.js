function connectWithDatabase(mongoURL) {
  const mongoose = require('mongoose');
  const { Schema } = mongoose;
  mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
      console.log("Connected!!!********* Horus Database is live for Horus!!!")
    )
    .catch((err) => console.log("Connection Error ", err));
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
  return  mongoose.model("horusModel", HorusSchema);
}

module.exports = connectWithDatabase;