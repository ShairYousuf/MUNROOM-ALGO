import { SearchInterface } from "./search_interface";
import { Users } from "../tables/users";
import { Listings } from "../tables/listings";
import { ListingDocument } from "@memorial-ece6400/mr-db-interface";

export class SearchListings extends SearchInterface {
  Users: Users;
  Listings: Listings;

  constructor() {
    super();

    this.Users = new Users(this.DB);
    this.Listings = new Listings(this.DB);
  }

  /**
   * functions to get the listings using the search criteria given by the user
   * @param user_id user id of the user
   * @param latitude location latitude
   * @param longitude location longitude
   * @param radius radius used to get the distance from the center
   * @param lower_price lower price of the listing
   * @param upper_price maximum price of the listing
   * @param min_bed minimum amount of beds
   * @param min_bath minimum amount of baths
   * @returns returns a list of house listings matching the criteria
   */
  async findMatchingProperties(
    user_id: string,
    latitude: number,
    longitude: number,
    radius: number,
    lower_price?: number,
    upper_price?: number,
    min_bed?: number,
    min_bath?: number
  ): Promise<any[]> {
    try {
      const validId: boolean = await this.Users.checkUserID(user_id);

      if (validId) {
        const preferences = (await this.Users.FetchUserPreference(
          user_id
        )) as Partial<ListingDocument>;

        const matches = this.Listings.SearchListings(
          preferences,
          latitude,
          longitude,
          radius,
          lower_price || undefined,
          upper_price || undefined,
          min_bed || undefined,
          min_bath || undefined
        );

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
