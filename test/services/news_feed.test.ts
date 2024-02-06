import { NewsFeed } from "../../src/services/news_feed";
import { Users } from "../../src/tables/users";
import { Listings } from "../../src/tables/listings";

import mock_user_data from "../mocks/user_data";
import mock_listing_data from "../mocks/listing_data";

jest.mock("../../src/tables/users");
jest.mock("../../src/tables/listings");

describe("NewsFeed", () => {
  let newsFeed: NewsFeed;
  let usersMock: jest.Mocked<Users>;
  let listingsMock: jest.Mocked<Listings>;
  const user_id = mock_user_data[0].user_id;
  const bad_user_id = "invalid_user_id";
  const allTruePrefs = {
    pets: true,
    parties: true,
    smoking: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    usersMock = new Users(null!) as jest.Mocked<Users>;
    listingsMock = new Listings(null!) as jest.Mocked<Listings>;
    newsFeed = new NewsFeed();
    newsFeed.Users = usersMock;
    newsFeed.Listings = listingsMock;
  });

  describe("findMatchingProperties", () => {
    it("should call FetchUserPreference and FetchListings with correct parameters", async () => {
      usersMock.checkUserID.mockResolvedValue(true);
      usersMock.FetchUserPreference.mockResolvedValue({
        preferences: {
          pets: true,
          parties: true,
          smoking: true
        }
      });
      listingsMock.FetchListings.mockResolvedValue([
        mock_listing_data[4],
        mock_listing_data[5]
      ]);

      const result = await newsFeed.findMatchingProperties(user_id);

      expect(usersMock.FetchUserPreference).toHaveBeenCalledWith(user_id);
      expect(listingsMock.FetchListings).toHaveBeenCalledWith(
        allTruePrefs,
        0,
        30
      );

      expect(result).toEqual([mock_listing_data[4], mock_listing_data[5]]);
    });

    it("should throw an error if user_id is not valid", async () => {
      usersMock.checkUserID.mockResolvedValue(false);

      try {
        await newsFeed.findMatchingProperties(bad_user_id, 0, 0);
        // should never happen
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toBe(
          `findMatchingProperties threw this error because user_id is not valid ${bad_user_id}`
        );
      }

      expect(usersMock.checkUserID).toHaveBeenCalledWith(bad_user_id);
      expect(usersMock.FetchUserPreference).not.toHaveBeenCalled();
      expect(listingsMock.FetchListings).not.toHaveBeenCalled();
    });

    it("should show one listing with all false preferences", async () => {
      usersMock.checkUserID.mockResolvedValue(true);

      usersMock.FetchUserPreference.mockResolvedValue({
        preferences: {
          pets: false,
          parties: false,
          smoking: false
        }
      });

      listingsMock.FetchListings.mockResolvedValue([mock_listing_data[2]]);

      const result = await newsFeed.findMatchingProperties(
        mock_user_data[1].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalledWith(
        mock_user_data[1].user_id
      );
      expect(listingsMock.FetchListings).toHaveBeenCalled();

      expect(result).toEqual([mock_listing_data[2]]);
    });

    it("should show one listing with all true preferences", async () => {
      usersMock.checkUserID.mockResolvedValue(true);

      usersMock.FetchUserPreference.mockResolvedValue({
        preferences: {
          pets: true,
          parties: true,
          smoking: true
        }
      });

      listingsMock.FetchListings.mockResolvedValue([mock_listing_data[4]]);

      const result = await newsFeed.findMatchingProperties(
        mock_user_data[1].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalled();
      expect(listingsMock.FetchListings).toHaveBeenCalled();

      expect(result).toEqual([mock_listing_data[4]]);
    });

    it("should show one listing with mixed preferences", async () => {
      usersMock.checkUserID.mockResolvedValue(true);

      usersMock.FetchUserPreference.mockResolvedValue({
        preferences: {
          pets: true,
          parties: false,
          smoking: false
        }
      });

      listingsMock.FetchListings.mockResolvedValue([mock_listing_data[1]]);

      const result = await newsFeed.findMatchingProperties(
        mock_user_data[1].user_id
      );

      expect(usersMock.FetchUserPreference).toHaveBeenCalled();
      expect(listingsMock.FetchListings).toHaveBeenCalled();

      expect(result).toEqual([mock_listing_data[1]]);
    });

    it("should page/offset correctly", async () => {
      usersMock.checkUserID.mockResolvedValue(true);

      usersMock.FetchUserPreference.mockResolvedValue({
        preferences: {
          pets: true,
          parties: true,
          smoking: true
        }
      });

      listingsMock.FetchListings.mockResolvedValue([mock_listing_data[3]]);

      const result = await newsFeed.findMatchingProperties(user_id, 0, 1);
      expect(result).toStrictEqual([mock_listing_data[3]]);

      expect(listingsMock.FetchListings).toHaveBeenCalledWith(
        allTruePrefs,
        0,
        1
      );

      listingsMock.FetchListings.mockResolvedValue([mock_listing_data[4]]);
      const result2 = await newsFeed.findMatchingProperties(user_id, 1, 1);
      expect(result2).toStrictEqual([mock_listing_data[4]]);

      expect(listingsMock.FetchListings).toHaveBeenCalledWith(
        allTruePrefs,
        1,
        1
      );
    });
  });
});
