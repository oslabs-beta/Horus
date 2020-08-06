const HorusCW = require("../HorusClientWrapper.js");
const grpc = require("grpc");

describe("Unit tests for Client Wrapper", () => {
  it("Should ..... ", () => {
    class mockHorusCW{
      // client, service, file, serviceName, mongoURL
      /// ???
      // constructor(...) {}
    }
    // ????
    // const mockClient = ...
    // const mockService =...
    const mockFile = 'data.txt';
    const mockServiceName = 'Books';
    const mockURI = 'mongodb+srv://tinyturtle2:horuspass@cluster0-4egmg.mongodb.net/books?retryWrites=true&w=majority';
    const horusCW = new HorusCW(mockClient, mockService, mockFile, mockServiceName, mockURI);
    // getting the instance fo the client wrapper class from package whenever apply to the stub in microservice
    expect(horusCW instanceof mockHorusCW).toBeTruthy;
  });

  // checking the rps methods creation
  it("....", () => {
    class mockHorusCW{
      // client, service, file, serviceName, mongoURL
      /// ???
      constructor(mockClient, mockService, mockFile, mockServiceName, mockURI) {
        this.metadata = {};
        const names = Object.keys(mockService.service);
        this.model = horusModelConstructor(mockURI);
        horusCW.makeMethods(this, mockClient, this.metadata, names, mockFile, this.model, mockServiceName, getTargetName(service, names), writeToFile)
      }
    }
  })
})