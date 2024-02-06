import { UserDocument, MUNRoomDB } from "@memorial-ece6400/mr-db-interface";
import { ServiceInterface } from "../../src/services/service_interface";
import { Users } from "../../src/tables/users";
import mock_user_data from "../mocks/user_data";

jest.setTimeout(20000);

jest.mock("@memorial-ece6400/mr-db-interface", () => ({
  MUNRoomDB: function () {
    return {
      getUsersModule: jest.fn().mockImplementation(() => {
        return {
          getUser: jest
            .fn()
            .mockImplementation(async (filterQuery, fieldsToGet) => {
              return new Promise((resolve) => {
                const result = mock_user_data.find((user) => {
                  return Object.entries(filterQuery).every(([key, value]) => {
                    if (Array.isArray(value)) {
                      return value.every((v) => (user as any)[key].includes(v));
                    } else {
                      return (user as any)[key] === value;
                    }
                  });
                });
                if (result) {
                  if (fieldsToGet.length === 0) {
                    return resolve(result as any);
                  } else if (Object.keys(fieldsToGet).length === 0) {
                    return resolve(result as any);
                  }
                  const filteredResult: Partial<UserDocument> = {};
                  fieldsToGet.forEach((key: string) => {
                    filteredResult[key as keyof UserDocument] = (result as any)[
                      key
                    ];
                  });
                  return resolve(filteredResult as Partial<UserDocument>);
                }
                return resolve(null as any);
              });
            })
        };
      })
    };
  }
}));

describe("UsersTable", () => {
  let usersTable: Users;
  let dbInterfaceMock: MUNRoomDB = new MUNRoomDB();
  const bad_user_id = "invalid_user_id";
  const valid_user_1 = mock_user_data[0];
  const valid_user_2 = mock_user_data[1];

  beforeEach(() => {
    jest.clearAllMocks();
    usersTable = new Users(dbInterfaceMock);
  });

  describe("checkUserID", () => {
    it("should return true for a valid user_id", async () => {
      const result = await usersTable.checkUserID(valid_user_1.user_id);
      expect(result).toEqual(true);
    });

    it("should return false for an invalid user_id", async () => {
      const result = await usersTable.checkUserID(bad_user_id);
      expect(result).toEqual(false);
    });
  });

  describe("FetchUserPreference", () => {
    it("should return the user preferences for a valid user_id", async () => {
      const result: Partial<UserDocument> =
        await usersTable.FetchUserPreference(valid_user_1.user_id);
      expect(result.preferences).toBe(valid_user_1.preferences);
    });

    it("The two test users should not have the same preferences", async () => {
      const result1: Partial<UserDocument> =
        await usersTable.FetchUserPreference(valid_user_1.user_id);
      const result2: Partial<UserDocument> =
        await usersTable.FetchUserPreference(valid_user_2.user_id);

      expect(result1.preferences).not.toBe(result2.preferences);
    });

    it("should return an error message for an invalid user_id", async () => {
      try {
        await usersTable.FetchUserPreference(bad_user_id);
        // should never happen
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toBe(
          "FetchUserPreference threw this error because the user_id is invalid."
        );
      }
    });
  });

  describe("FetchUserAlertSettings", () => {
    it("should return the user alert settings for a valid user_id", async () => {
      const result: Partial<UserDocument> =
        await usersTable.FetchUserAlertSettings(valid_user_1.user_id);
      expect(result.alert_criteria).toBe(valid_user_1.alert_criteria);
    });

    it("The two test users should not have the same alert_criteria", async () => {
      const result1: Partial<UserDocument> =
        await usersTable.FetchUserAlertSettings(valid_user_1.user_id);
      const result2: Partial<UserDocument> =
        await usersTable.FetchUserAlertSettings(valid_user_2.user_id);

      expect(result1.alert_criteria).not.toBe(result2.alert_criteria);
    });

    it("should return an error message for an invalid user_id", async () => {
      try {
        await usersTable.FetchUserAlertSettings(bad_user_id);
        // should never happen
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toBe(
          "FetchUserAlertSettings threw this error because the user_id is invalid."
        );
      }
    });
  });
});
