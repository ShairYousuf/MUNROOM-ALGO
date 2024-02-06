import { mock_search_listing_data } from "../mocks/search_listings_data";
import mock_user_data from "../mocks/user_data";
import { SearchListings } from "../../src/services/search_listings";
import { expect, jest } from "@jest/globals";
import { Users } from "../../src/tables/users";
import { Listings } from "../../src/tables/listings";
import { mock_search_listing_request_data } from "../mocks/search_listings_request_data";
import { UserDocument } from "@memorial-ece6400/mr-db-interface";

describe("SearchListings", () => {
  let searchListings: SearchListings;
  let usersMock: jest.Mocked<Users>;
  let listingsMock: jest.Mocked<Listings>;

  beforeEach(() => {
    jest.clearAllMocks();
    usersMock = new Users(null!) as jest.Mocked<Users>;
    listingsMock = new Listings(null!) as jest.Mocked<Listings>;
    searchListings = new SearchListings();
    searchListings.Users = usersMock;
    searchListings.Listings = listingsMock;
    usersMock.checkUserID = jest.fn();
    usersMock.FetchUserPreference = jest.fn();
    listingsMock.SearchListings = jest.fn();
  });

  describe("findMatchingProperties", () => {
    it("required parameter provided, should return the correct listings for a valid user search", async () => {
      usersMock.checkUserID.mockResolvedValue(true);
      usersMock.FetchUserPreference.mockResolvedValue({
        preferences:
          mock_search_listing_request_data[0].preferences?.preferences
      } as Partial<UserDocument>);
      listingsMock.SearchListings.mockResolvedValue([
        mock_search_listing_data[3],
        mock_search_listing_data[4]
      ]);

      const result = await searchListings.findMatchingProperties(
        mock_search_listing_request_data[0].user_id,
        mock_search_listing_request_data[0].latitude,
        mock_search_listing_request_data[0].longitude,
        mock_search_listing_request_data[0].radius
      );

      expect(usersMock.checkUserID).toHaveBeenCalledWith(
        mock_user_data[0].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalledWith(
        mock_user_data[0].user_id.toString()
      );

      expect(listingsMock.SearchListings).toHaveBeenCalledWith(
        mock_search_listing_request_data[0].preferences,
        mock_search_listing_request_data[0].latitude,
        mock_search_listing_request_data[0].longitude,
        mock_search_listing_request_data[0].radius,
        mock_search_listing_request_data[0].lowerPrice,
        mock_search_listing_request_data[0].upperPrice,
        mock_search_listing_request_data[0].minBed,
        mock_search_listing_request_data[0].minBath
      );

      expect(result).toEqual([
        mock_search_listing_data[3],
        mock_search_listing_data[4]
      ]);
    });

    it("should return the correct listings for a valid user search with all parameters provided", async () => {
      usersMock.checkUserID.mockResolvedValue(true);
      usersMock.FetchUserPreference.mockResolvedValue({
        preferences:
          mock_search_listing_request_data[1].preferences?.preferences
      } as Partial<UserDocument>);
      listingsMock.SearchListings.mockResolvedValue([
        mock_search_listing_data[5]
      ]);

      const result = await searchListings.findMatchingProperties(
        mock_search_listing_request_data[1].user_id,
        mock_search_listing_request_data[1].latitude,
        mock_search_listing_request_data[1].longitude,
        mock_search_listing_request_data[1].radius,
        mock_search_listing_request_data[1].lowerPrice,
        mock_search_listing_request_data[1].upperPrice,
        mock_search_listing_request_data[1].minBed,
        mock_search_listing_request_data[1].minBath
      );

      expect(usersMock.checkUserID).toHaveBeenCalledWith(
        mock_user_data[0].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalledWith(
        mock_user_data[0].user_id.toString()
      );
      expect(listingsMock.SearchListings).toHaveBeenCalledWith(
        mock_search_listing_request_data[1].preferences,
        mock_search_listing_request_data[1].latitude,
        mock_search_listing_request_data[1].longitude,
        mock_search_listing_request_data[1].radius,
        mock_search_listing_request_data[1].lowerPrice,
        mock_search_listing_request_data[1].upperPrice,
        mock_search_listing_request_data[1].minBed,
        mock_search_listing_request_data[1].minBath
      );

      expect(result).toEqual([mock_search_listing_data[5]]);
    });

    it("should return the correct listings for a valid user search with partial parameters provided", async () => {
      usersMock.checkUserID.mockResolvedValue(true);
      usersMock.FetchUserPreference.mockResolvedValue({
        preferences:
          mock_search_listing_request_data[2].preferences?.preferences
      } as Partial<UserDocument>);
      listingsMock.SearchListings.mockResolvedValue([
        mock_search_listing_data[5]
      ]);

      const result = await searchListings.findMatchingProperties(
        mock_search_listing_request_data[2].user_id,
        mock_search_listing_request_data[2].latitude,
        mock_search_listing_request_data[2].longitude,
        mock_search_listing_request_data[2].radius,
        mock_search_listing_request_data[2].lowerPrice,
        mock_search_listing_request_data[2].upperPrice,
        mock_search_listing_request_data[2].minBed,
        mock_search_listing_request_data[2].minBath
      );

      expect(usersMock.checkUserID).toHaveBeenCalledWith(
        mock_user_data[0].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalledWith(
        mock_user_data[0].user_id
      );
      expect(listingsMock.SearchListings).toHaveBeenCalledWith(
        mock_search_listing_request_data[2].preferences,
        mock_search_listing_request_data[2].latitude,
        mock_search_listing_request_data[2].longitude,
        mock_search_listing_request_data[2].radius,
        mock_search_listing_request_data[2].lowerPrice,
        mock_search_listing_request_data[2].upperPrice,
        mock_search_listing_request_data[2].minBed,
        mock_search_listing_request_data[2].minBath
      );

      expect(result).toEqual([mock_search_listing_data[5]]);
    });

    it("should not return any values for users with no matching preferences", async () => {
      usersMock.checkUserID.mockResolvedValue(true);
      usersMock.FetchUserPreference.mockResolvedValue({
        preferences:
          mock_search_listing_request_data[3].preferences?.preferences
      } as Partial<UserDocument>);
      listingsMock.SearchListings.mockResolvedValue([]);

      const result = await searchListings.findMatchingProperties(
        mock_search_listing_request_data[3].user_id,
        mock_search_listing_request_data[3].latitude,
        mock_search_listing_request_data[3].longitude,
        mock_search_listing_request_data[3].radius,
        mock_search_listing_request_data[3].lowerPrice,
        mock_search_listing_request_data[3].upperPrice,
        mock_search_listing_request_data[3].minBed,
        mock_search_listing_request_data[3].minBath
      );

      expect(usersMock.checkUserID).toHaveBeenCalledWith(
        mock_user_data[1].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalledWith(
        mock_user_data[1].user_id.toString()
      );
      expect(listingsMock.SearchListings).toHaveBeenCalledWith(
        mock_search_listing_request_data[3].preferences,
        mock_search_listing_request_data[3].latitude,
        mock_search_listing_request_data[3].longitude,
        mock_search_listing_request_data[3].radius,
        mock_search_listing_request_data[3].lowerPrice,
        mock_search_listing_request_data[3].upperPrice,
        mock_search_listing_request_data[3].minBed,
        mock_search_listing_request_data[3].minBath
      );

      expect(result).toEqual([]);
    });

    it("should throw an error if the user_id is invalid", async () => {
      usersMock.checkUserID.mockResolvedValue(false);
      try {
        await searchListings.findMatchingProperties(
          mock_search_listing_request_data[4].user_id,
          mock_search_listing_request_data[4].latitude,
          mock_search_listing_request_data[4].longitude,
          mock_search_listing_request_data[4].radius
        );
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toBe(
          `findMatchingProperties threw this error because user_id is not valid ${mock_search_listing_request_data[4].user_id}`
        );
      }

      expect(usersMock.checkUserID).toHaveBeenCalledWith("invalid_user_id");
      expect(usersMock.FetchUserPreference).not.toHaveBeenCalled();
      expect(listingsMock.SearchListings).not.toHaveBeenCalled();
    });
  });
});
