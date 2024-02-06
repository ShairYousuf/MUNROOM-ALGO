import mock_listing_data from "../mocks/listing_data";
import mock_user_data from "../mocks/user_data";
import { Listings } from "../../src/tables/listings";
import { ServiceInterface } from "../../src/services/service_interface";
import { ObjectId } from "mongodb";
import {
  ListingDocument,
  UserDocument,
  MUNRoomDB
} from "@memorial-ece6400/mr-db-interface";

jest.mock("@memorial-ece6400/mr-db-interface", () => ({
  MUNRoomDB: function () {
    return {
      getUserModule: jest.fn(),
      getListingsModule: jest.fn().mockImplementation(() => {
        return {
          getListings: jest
            .fn()
            .mockImplementation((preferences: Partial<UserDocument>) => {
              const result = mock_listing_data.filter((listings: any) => {
                return Object.entries(preferences).every(([key, value]) => {
                  if (typeof value === "object" && value !== null) {
                    return Object.entries(value).every(
                      ([k, v]) => listings[key][k] === v
                    );
                  } else {
                    return listings[key] === value;
                  }
                });
              });
              return result ? result : [];
            })
        };
      })
    };
  }
}));

describe("ListingsTable", () => {
  let listings: Listings;
  let dbInterfaceMock: MUNRoomDB = new MUNRoomDB();

  const valid_user_1 = mock_user_data[0];
  const valid_user_2 = mock_user_data[0];
  const user_1_preferences: Partial<UserDocument> =
    valid_user_1.preferences as Partial<UserDocument>;
  const user_2_preferences: Partial<UserDocument> =
    valid_user_2.preferences as Partial<UserDocument>;

  beforeEach(() => {
    jest.clearAllMocks();
    listings = new Listings(dbInterfaceMock);
  });

  describe("FetchListings", () => {
    it("should return correct listings for a valid user", async () => {
      const result = await listings.FetchListings(user_1_preferences);
      expect(result).toStrictEqual([
        mock_listing_data[3],
        mock_listing_data[4]
      ]);
    });

    it("should page/offset correctly", async () => {
      const result = await listings.FetchListings(user_1_preferences, 0, 1);
      expect(result).toStrictEqual([mock_listing_data[3]]);
      const result2 = await listings.FetchListings(user_1_preferences, 1, 1);
      expect(result2).toStrictEqual([mock_listing_data[4]]);
    });

    it("The two test users should not have the same listings", async () => {
      const result1: ListingDocument[] =
        await listings.FetchListings(user_1_preferences);
      const result2: ListingDocument[] =
        await listings.FetchListings(user_2_preferences);

      expect(result1).not.toBe(result2);
    });
  });
});
