export const getFeedRequestTestData = {
  validVariablesWithResult: {
    user_id: "U1234",
    step_size: 50,
    step_index: 0
  },
  validVariablesWithoutResult: {
    user_id: "U1234",
    step_size: 50,
    step_index: 20
  },
  singleNullRequiredVariables: {
    user_id: null,
    step_size: 50,
    step_index: 0
  },
  multipleNullRequiredVariables: {
    user_id: null,
    step_size: null,
    step_index: null
  },
  missingRequiredVariables: {},
  invalidVariables: {
    user_id: "User_Not_found",
    step_size: 50,
    step_index: 0
  }
};
