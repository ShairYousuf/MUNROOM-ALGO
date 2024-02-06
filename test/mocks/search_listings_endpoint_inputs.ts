export const searchListingsEndpointInputs = {
  validVariablesWithResult: {
    user_id: "U1234",
    latitude: 47.5615,
    longitude: 52.7126,
    radius: 10
  },
  validVariablesWithoutResult: {
    user_id: "U1234",
    latitude: 47.5615,
    longitude: -52.7126,
    radius: 1,
    lower_price: 1000,
    upper_price: 2000,
    min_bed: 2,
    min_bath: 1
  },
  singleNullRequiredVariables: {
    user_id: null,
    latitude: 47.5615,
    longitude: -52.7126,
    radius: 10,
    lower_price: 1000,
    upper_price: 2000,
    min_bed: 2,
    min_bath: 1
  },
  multipleNullRequiredVariables: {
    user_id: null,
    latitude: null,
    longitude: null,
    radius: null,
    lower_price: 1000,
    upper_price: 2000,
    min_bed: 2,
    min_bath: 1
  },
  missingRequiredVariables: {
    lower_price: 1000,
    upper_price: 2000,
    min_bed: 2,
    min_bath: 1
  },
  invalidVariables: {
    user_id: "User_Not_found",
    latitude: 47.5615,
    longitude: -52.7126,
    radius: -2,
    lower_price: 1000,
    upper_price: 2000,
    min_bed: 0,
    min_bath: 1
  },
  serverErrorMock: {
    user_id: "U1234",
    latitude: 47.5615,
    longitude: 52.7126,
    radius: 10,
    lower_price: 1,
    upper_price: 2000,
    min_bed: 2,
    min_bath: 1
  }
};
