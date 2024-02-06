import { MUNRoomDB } from "@memorial-ece6400/mr-db-interface/";

/**
 * @class ServiceInterface
 * @classdesc This class represents an abstract service.
 * @property {MUNRoomDB} DB - The database instance used by the service.
 */
export class ServiceInterface {
  DB: MUNRoomDB;

  /**
   * Creates an instance of ServiceInterface.
   * @constructor
   * @throws {Error} Missing environment variable if any of the required environment variables are not set.
   */
  constructor() {
    const host = process.env.MONGODB_HOST;
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    if (!username || !password || !host)
      throw new Error("Missing environment variable");

    const connectionString = `mongodb+srv://${username}:${password}@${host}/dev?retryWrites=true&w=majority`;

    this.DB = new MUNRoomDB(connectionString);
  }
}
