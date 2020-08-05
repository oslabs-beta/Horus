const path  = require('path');
const validate = require('./inpValidations');
const HorusClientWrapper = require('../horusClientWrapper');
// user will provide their own path to the stub integrated with horusClientWrapper
const stubWrapped = require(path.join(__dirname, "../stubs/booksStub"));

describe("...", () => {
  it('...', () => {
    expect(stubWrapped instanceof HorusClientWrapper).toBeTruthy();
    // last 3 arguments should be of string type
    // 3rd arg. should have .txt extension
    // 5th arg. should have a valid mongoUrl link type
    // expect(typeof stubWrapped.mongoURL).toBe("string");

  });
  it('should not throw error for a valid config file', () => {
    expect(() => validate(stubWrapped)).not.toThrow();
  });
  it("should throw error for missing or invalid 'microservice' property", () => {
    const errRegex = /Invalid input "microservice": Please provide a name for your microservice/;

    const errorMsg = ''
    // Missing microservice property
    delete config['microservice'];
    expect(() => validateInput(config)).toThrow(errRegex);

    // Invalid microservice property
    config.microservice = 143;
    expect(() => validateInput(config)).toThrow(errRegex);
  });
})