import { UserDocument } from "@memorial-ece6400/mr-db-interface";

export class Users {
  Database: any;
  usersTable: any;

  /**
   * @brief Constructor for UsersTable
   * @param dbConnection The database connection object
   */
  constructor(dbConnection: any) {
    this.Database = dbConnection;
    this.usersTable = null;
  }

  /**
   * @brief Checks if the usersTable is null and retrieves the groups module from the Database if it is
   * @returns Promise<void>
   */
  async setup(): Promise<void> {
    if (!this.usersTable)
      this.usersTable = await this.Database.getUsersModule();
  }

  /**
   * @brief Checks if a user_id is valid
   * @param userId The user_id to check
   * @returns Promise<boolean> Whether or not the user_id is valid
   * @throws Error if userId is null or not valid
   */
  async checkUserID(userId: string): Promise<boolean> {
    await this.setup();
    try {
      const result = await this.usersTable.getUser({ user_id: userId }, {}, {});
      if (result != null && "user_id" in result) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(`checkUserID threw this error: ${error.message}`);
    }
  }

  /**
   * @brief Gets the user's preferences from the database
   * @param userId The user_id associated with the user in question
   * @returns Promise<object> The user preferences or error message
   * @throws Error if userId is not valid
   */
  async FetchUserPreference(userId: string): Promise<Partial<UserDocument>> {
    await this.setup();
    try {
      const valid_id = await this.checkUserID(userId);

      if (valid_id) {
        const userPreferences = await this.usersTable.getUser(
          { user_id: userId },
          ["preferences"],
          {}
        );

        if (userPreferences != null) {
          return userPreferences;
        } else {
          throw new Error(
            "FetchUserPreference threw this error because it failed to get the user's preferences."
          );
        }
      } else {
        throw new Error(
          "FetchUserPreference threw this error because the user_id is invalid."
        );
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * @brief Gets the user's alert settings from the database
   * @param userId The user_id associated with the user in question
   * @returns Promise<object> The user alert settings or error message
   * @throws Error if userId is not valid
   */
  async FetchUserAlertSettings(userId: string): Promise<Partial<UserDocument>> {
    await this.setup();
    try {
      const valid_id = await this.checkUserID(userId);

      if (valid_id) {
        // TODO: Update return parameters when sure about how
        const userAlertSettings = await this.usersTable.getUser(
          { user_id: userId },
          ["alert_criteria"],
          {}
        );

        if (userAlertSettings != null) {
          return userAlertSettings;
        } else {
          throw new Error(
            "FetchUserPreference threw this error because it failed to get the user's alert_criteria."
          );
        }
      } else {
        throw new Error(
          "FetchUserAlertSettings threw this error because the user_id is invalid."
        );
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
