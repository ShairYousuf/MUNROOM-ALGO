import request from "supertest";
import mock_listing_data from "./mocks/listing_data";
import { StatusCodes } from "http-status-codes";
import { getFeedRequestTestData } from "./mocks/get_feed_request_data";
import { searchListingsEndpointInputs } from "./mocks/search_listings_endpoint_inputs";
import { mock_search_listing_data } from "./mocks/search_listings_data";

const checkAuthenticated = jest.fn();

jest.mock("../src/utils/auth", () => ({
  ...jest.requireActual("../src/utils/auth"),
  checkAuthenticated: checkAuthenticated
}));

beforeAll((done) => {
  jest.clearAllMocks();
  done();
});

afterAll((done) => {
  done();
});

import app from "../src/app";

describe("GET /", () => {
  it("Rejects unauthenticated users", async () => {
    checkAuthenticated.mockImplementationOnce((req: any, res: any) => {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    });

    const response = await request(app).get("/");

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Accepts authenticated users", async () => {
    checkAuthenticated.mockImplementationOnce((req: any, res: any) => {
      res.sendStatus(StatusCodes.OK);
    });

    const response = await request(app).get("/");

    expect(response.statusCode).toEqual(StatusCodes.OK);
  });
});

const mockNewsFeedFindMatchingProperties = jest.fn();

jest.mock("../src/services/news_feed", () => {
  return {
    NewsFeed: class {
      findMatchingProperties = mockNewsFeedFindMatchingProperties;
    }
  };
});

describe("GET /get_feed", () => {
  it("Should return 401 UNAUTHORIZED for unauthenticated users", async () => {
    checkAuthenticated.mockImplementationOnce((req: any, res: any) => {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    });
    const response = await request(app).get("/get_feed");
    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Should return 200 OK and a value when all required variables are passed in", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    mockNewsFeedFindMatchingProperties.mockReturnValueOnce(
      Promise.resolve([mock_listing_data[3], mock_listing_data[4]])
    );

    const res = await request(app)
      .get("/get_feed")
      .query(getFeedRequestTestData.validVariablesWithResult);
    expect(res.status).toEqual(StatusCodes.OK);
  });

  it("Should return 204 NO_CONTENT when all required variables are passed in but there is no match", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    mockNewsFeedFindMatchingProperties.mockReturnValueOnce(Promise.resolve([]));

    const res = await request(app)
      .get("/get_feed")
      .query(getFeedRequestTestData.validVariablesWithoutResult);
    expect(res.status).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when all required variables are passed in but some are null", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );
    const res = await request(app)
      .get("/get_feed")
      .query(getFeedRequestTestData.singleNullRequiredVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when all required variables are passed but all are null", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );
    const res = await request(app)
      .get("/get_feed")
      .query(getFeedRequestTestData.multipleNullRequiredVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when required variables are missing", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );
    const res = await request(app)
      .get("/get_feed")
      .query(getFeedRequestTestData.missingRequiredVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 500 INTERNAL_SERVER_ERROR when UserID is invalid", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );
    const res = await request(app)
      .get("/get_feed")
      .query(getFeedRequestTestData.invalidVariables);
    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

const mockFindMatchingProperties = jest.fn();

jest.mock("../src/services/search_listings", () => {
  return {
    SearchListings: class {
      findMatchingProperties = mockFindMatchingProperties;
    }
  };
});

describe("GET /search_listings", () => {
  it("Should return 401 UNAUTHORIZED for unauthenticated users", async () => {
    checkAuthenticated.mockImplementationOnce((req: any, res: any) => {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    });
    const response = await request(app).get("/search_listings");
    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Should return 200 OK and value when all required variables passed in", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );
    mockFindMatchingProperties.mockReturnValueOnce(
      Promise.resolve([
        mock_search_listing_data[3],
        mock_search_listing_data[4]
      ])
    );

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.validVariablesWithResult);
    expect(res.status).toEqual(StatusCodes.OK);
  });

  it("Should return 204 NO_CONTENT when all required variables passed in and no search matches found", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    mockFindMatchingProperties.mockReturnValueOnce(Promise.resolve([]));

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.validVariablesWithoutResult);
    expect(res.status).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when all variables passed in but some are null", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.singleNullRequiredVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when all null values passed in", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.multipleNullRequiredVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when all required variables are not passed", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.missingRequiredVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 422 UNPROCESSABLE_ENTITY when one or more variables have an invalid type", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.invalidVariables);
    expect(res.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it("Should return 500 INTERNAL_SERVER_ERROR when unexpected server error thrown", async () => {
    checkAuthenticated.mockImplementationOnce(
      (req: any, res: any, next: any) => {
        next();
      }
    );

    mockFindMatchingProperties.mockRejectedValue(
      new Error("Unexpected server error")
    );

    const res = await request(app)
      .get("/search_listings")
      .query(searchListingsEndpointInputs.serverErrorMock);
    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
