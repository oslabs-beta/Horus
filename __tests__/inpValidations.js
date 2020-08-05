const validate = {};

validate.inputsCheck = (...args) => {
  const argsNum = args.length();
  const service = args[1];
  const file = args[2];
  const serviceName = args[3];
  const mongoURL = args[4];
  // check if service has 'service' key on it
  // with object as a value on it
  // that object's keys should be methods names
  if (argsNum !== 5) {
    throw new Error('Valid input to the HorusClientWrapper should have 5 elements');
  }
}

module.exports = validate;