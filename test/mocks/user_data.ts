import { UserDocument } from "@memorial-ece6400/mr-db-interface";

const mock_user_data: UserDocument[] = [
  {
    user_id: "U1234",
    name: "John Doe",
    username: "jd-rules",
    password: "string",
    email: "string",
    user_type: "renter",
    groups: [],
    listings: [],
    alert_criteria: {
      location: {
        latitude: 0,
        longitude: 0
      },
      radius: 10,
      lowerPrice: 0,
      upperPrice: 999999,
      minBed: 1,
      minBath: 1
    },
    preferences: {
      pets: true,
      parties: true,
      smoking: true
    },
    creation_time: new Date("2023-10-27T06:31:19.214+00:00")
  },
  {
    user_id: "U4567",
    name: "John Doe",
    username: "jd-rules",
    password: "string",
    email: "string",
    user_type: "renter",
    groups: [],
    listings: [],
    alert_criteria: {
      location: {
        latitude: 0,
        longitude: 0
      },
      radius: 10,
      lowerPrice: 0,
      upperPrice: 999999,
      minBed: 1,
      minBath: 1
    },
    preferences: {
      pets: false,
      parties: false,
      smoking: false
    },
    creation_time: new Date("2023-10-27T06:31:19.214+00:00")
  },
  {
    user_id: "U6789",
    name: "John Doe-er",
    username: "jd-rules",
    password: "string",
    email: "string",
    user_type: "renter",
    groups: [],
    listings: [],
    alert_criteria: {
      location: {
        latitude: 0,
        longitude: 0
      },
      radius: 10,
      lowerPrice: 0,
      upperPrice: 999999,
      minBed: 1,
      minBath: 1
    },
    preferences: {
      pets: true,
      parties: false,
      smoking: false
    },
    creation_time: new Date("2023-10-27T06:31:19.214+00:00")
  }
];

export default mock_user_data;
