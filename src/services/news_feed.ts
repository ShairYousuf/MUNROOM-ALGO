import { SearchInterface } from "./search_interface";
import { Users } from "../tables/users";
import { Listings } from "../tables/listings";
import { ListingDocument } from "@memorial-ece6400/mr-db-interface";

/**
 * @class
 * @classdesc Represents a news feed service that allows users to find matching properties based on their preferences.
 * @extends SearchInterface
 * @property {UsersTable} Users - The table of users.
 * @property {ListingsTable} Listings - The table of listings.
 */
export class NewsFeed extends SearchInterface {
  Users: Users;
  Listings: Listings;

  constructor() {
    super();

    this.Users = new Users(this.DB);
    this.Listings = new Listings(this.DB);
  }

  /**
   * @brief Find all matching properties based on user preferences
   * @param {string} user_id - The user ID
   * @param {number} [page=0] - The page number
   * @param {number} [offset=30] - The number of listings to request
   * @returns {Promise<any[]>} Array of matching properties
   * @throws {Error} Throws an error if user_id is not valid
   */
  async findMatchingProperties(
    user_id: string,
    page: number = 0,
    offset: number = 30
  ): Promise<ListingDocument[]> {
    try {
      const validId: boolean = await this.Users.checkUserID(user_id);

      if (validId) {
        const prefs = (await this.Users.FetchUserPreference(user_id))
          .preferences as Partial<ListingDocument>;

        const matches = await this.Listings.FetchListings(prefs, page, offset);

        return matches;
      } else {
        throw new Error(
          `findMatchingProperties threw this error because user_id is not valid ${user_id}`
        );
      }
    } catch (error: any) {
      throw error;
    }
  }
}
