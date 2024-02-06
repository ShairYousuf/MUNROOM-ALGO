import { ListingDocument } from "@memorial-ece6400/mr-db-interface";

export class Listings {
  Database: any;
  listingTable: any;

  /**
   * @brief Creates a new instance of ListingsTable.
   * @param dbConnection The database connection object from abstractService.
   */
  constructor(dbConnection: any) {
    this.Database = dbConnection;
    this.listingTable = null;
  }

  /**
   * @brief The setup function checks if the usersTable is null and if so, it retrieves
   *        the groups module from the Database.
   */
  async setup(): Promise<void> {
    if (!this.listingTable)
      this.listingTable = await this.Database.getListingsModule();
  }

  /**
   * @brief Fetches the listings that are relevant to the user's preferences
   * @param userPreferences Partial<ListingDocument> corresponding to the user's preferences
   * @param index The starting index for the search
   * @param offset The number of listings to return
   * @returns A list of listings or an empty list if no matches
   */
  async FetchListings(
    userPreferences: Partial<ListingDocument>,
    index = 0,
    offset = 30
  ): Promise<ListingDocument[]> {
    await this.setup();

    const results = (await this.listingTable.getListings(
      { preferences: userPreferences },
      {},
      {}
    )) as Array<ListingDocument>;

    if (results !== null) {
      const sliced = results.slice(index, index + offset);
      return sliced;
    } else {
      console.warn(`No results found: ${results}`); // Not an error - empty results allowed
      return [];
    }
  }

  /**
   * Function to get the listings using the search criteria given by the user
   * @param userPreferences Partial<ListingDocument> corresponding to the user's preferences
   * @param latitude Latitude of the user's location
   * @param longitude longitude of the user's location
   * @param radius radius used to get the distance from the center
   * @param lower_price minimum price of the listing
   * @param upper_price highest price of the listing
   * @param min_bed minimum amount of beds
   * @param min_bath minimum amount of baths
   * @returns A list of listings or an empty list if no matches
   */
  async SearchListings(
    userPreferences: Partial<ListingDocument>,
    latitude: number,
    longitude: number,
    radius: number,
    lower_price?: number,
    upper_price?: number,
    min_bed?: number,
    min_bath?: number
  ): Promise<ListingDocument[]> {
    await this.setup();

    const prefObject = {
      pets: userPreferences?.preferences?.pets ?? false,
      parties: userPreferences?.preferences?.parties ?? false,
      smoking: userPreferences?.preferences?.smoking ?? false
    };

    const query: any = {
      preferences: prefObject,
      "location.latitude": { $gte: latitude - radius, $lte: latitude + radius },
      "location.longitude": {
        $gte: longitude - radius,
        $lte: longitude + radius
      }
    };

    if (lower_price !== undefined && upper_price !== undefined) {
      query.price = {
        $gte: lower_price,
        $lte: upper_price
      };
    }

    if (min_bed !== undefined) {
      query.beds = {
        $gte: min_bed
      };
    }

    if (min_bath !== undefined) {
      query.baths = {
        $gte: min_bath
      };
    }

    let results = (await this.listingTable.getListings(
      query,
      {},
      {}
    )) as Array<ListingDocument>;

    if (results !== null) {
      return results;
    } else {
      console.warn("No results found");
      return [];
    }
  }
}
