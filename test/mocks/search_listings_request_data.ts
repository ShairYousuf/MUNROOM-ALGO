export const mock_search_listing_request_data = [
  {
    test_description:
      "required parameter provided, should return the correct listings for a valid user search",
    user_id: "U1234",
    preferences: { preferences: { pets: true, parties: true, smoking: true } },
    latitude: 40,
    longitude: 40,
    radius: 40,
    lowerPrice: undefined,
    upperPrice: undefined,
    minBed: undefined,
    minBath: undefined
  },
  {
    test_description:
      "should return the correct listings for a valid user search with all parameters provided",
    user_id: "U1234",
    preferences: { preferences: { pets: true, parties: true, smoking: true } },
    latitude: 40,
    longitude: 40,
    radius: 40,
    lowerPrice: 50,
    upperPrice: 250,
    minBed: 2,
    minBath: 2
  },
  {
    test_description:
      "should return the correct listings for a valid user search with partial parameters provided",
    user_id: "U1234",
    preferences: { preferences: { pets: true, parties: true, smoking: true } },
    latitude: 40,
    longitude: 40,
    radius: 40,
    lowerPrice: 50,
    upperPrice: undefined,
    minBed: 2,
    minBath: 2
  },
  {
    test_description:
      "should not return any values for users with no matching preferences",
    user_id: "U4567",
    preferences: {
      preferences: { pets: false, parties: false, smoking: false }
    },
    latitude: 40,
    longitude: 40,
    radius: 40,
    lowerPrice: 50,
    upperPrice: undefined,
    minBed: 2,
    minBath: 2
  },
  {
    test_description: "should throw an error if the user_id is invalid",
    user_id: "invalid_user_id",
    latitude: 0,
    longitude: 0,
    radius: 0
  }
];
