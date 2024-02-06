import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { endpointUtils } from "./utils/endpoint_utils";
import { NewsFeed } from "./services/news_feed";
import { SearchListings } from "./services/search_listings";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello There!\n General Kenobi!");
});

router.get("/get_feed", async (req: Request, res: Response): Promise<void> => {
  const searchCriteria = req.query;
  let error: any[] = [];

  error = endpointUtils.validateInput(
    searchCriteria.user_id,
    "user_id",
    "string",
    error
  );

  error = endpointUtils.validateInput(
    searchCriteria.step_size,
    "step_size",
    "string",
    error
  );

  error = endpointUtils.validateInput(
    searchCriteria.step_index,
    "step_index",
    "string",
    error
  );

  if (
    Number(searchCriteria.step_size) <= 0 ||
    Number(searchCriteria.step_size) > 100
  ) {
    error.push("step_size is invalid range");
  }

  if (
    Number(searchCriteria.step_index) < 0 ||
    Number(searchCriteria.step_index) > 1000
  ) {
    error.push("step_index is invalid range");
  }

  if (error.length > 0) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  } else {
    try {
      const newsFeed = new NewsFeed();
      const matchingProperties = await newsFeed.findMatchingProperties(
        searchCriteria.user_id as string,
        Number(searchCriteria.step_index),
        Number(searchCriteria.step_size)
      );
      if (matchingProperties.length == 0) {
        res.status(StatusCodes.NO_CONTENT).json("No Content");
      } else {
        res.status(StatusCodes.OK).json(matchingProperties);
      }
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error fetching newsfeed data at /get_feed",
        error: (error as Error).message
      });
    }
  }
});

router.get(
  "/search_listings",
  async (req: Request, res: Response): Promise<void> => {
    const searchCriteria = req.query;
    let error: any[] = [];

    error = endpointUtils.validateInput(
      searchCriteria.user_id,
      "user_id",
      "string",
      error
    );

    error = endpointUtils.validateInput(
      searchCriteria.latitude,
      "latitude",
      "string",
      error
    );

    error = endpointUtils.validateInput(
      searchCriteria.longitude,
      "longitude",
      "string",
      error
    );

    error = endpointUtils.validateInput(
      searchCriteria.radius,
      "radius",
      "string",
      error
    );

    error =
      searchCriteria.lowerPrice !== undefined
        ? endpointUtils.validateInput(
            searchCriteria.lowerPrice,
            "lower_price",
            "string",
            error
          )
        : error;

    error =
      searchCriteria.upperPrice !== undefined
        ? endpointUtils.validateInput(
            searchCriteria.upperPrice,
            "upper_price",
            "string",
            error
          )
        : error;

    error =
      searchCriteria.minBed !== undefined
        ? endpointUtils.validateInput(
            searchCriteria.minBed,
            "min_bed",
            "string",
            error
          )
        : error;

    error =
      searchCriteria.minBath !== undefined
        ? endpointUtils.validateInput(
            searchCriteria.minBath,
            "min_bath",
            "string",
            error
          )
        : error;

    if (Number(searchCriteria.radius) < 0) {
      error.push("radius is invalid range");
    }

    if (Number(searchCriteria.lower_price) < 0) {
      error.push("lower_price is invalid range");
    }

    if (
      Number(searchCriteria.upper_price) < Number(searchCriteria.lower_price)
    ) {
      error.push("upper_price is invalid range");
    }

    if (Number(searchCriteria.min_bed) < 0) {
      error.push("min_bed is invalid range");
    }

    if (Number(searchCriteria.min_bath) < 0) {
      error.push("min_bath is invalid range");
    }

    if (error.length > 0) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
    } else {
      try {
        const searchListings = new SearchListings();
        const matchingProperties = await searchListings.findMatchingProperties(
          searchCriteria.user_id as string,
          Number(searchCriteria.latitude),
          Number(searchCriteria.longitude),
          Number(searchCriteria.radius),
          searchCriteria.lower_price ? Number(searchCriteria.lower_price) : 0,
          searchCriteria.upper_price
            ? Number(searchCriteria.upper_price)
            : undefined,
          searchCriteria.min_bed ? Number(searchCriteria.min_bed) : 0,
          searchCriteria.min_bath ? Number(searchCriteria.min_bath) : 0
        );
        if (matchingProperties.length == 0) {
          res.status(StatusCodes.NO_CONTENT).json("No Content");
        } else {
          res.status(StatusCodes.OK).json(matchingProperties);
        }
      } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Error fetching search data at /search_listings",
          error: (error as Error).message
        });
      }
    }
  }
);

export default router;
