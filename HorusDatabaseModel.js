





function makeMongooseConnection(mongoURL) {

  const mongoose = require('mongoose');

  const { Schema } = mongoose;

  mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Horus Client Wrapper Connected to Database '))
    .catch((error) => console.log('ERROR Horus Client Wrapper couldn\t connect to Database', error));

  const RequestSchema = new Schema({
    name: {
      type: String,
      required: true
    }
  });

  const customerModel = mongoose.model('request', RequestSchema);

}



module.exports = makeMongooseConnection;
