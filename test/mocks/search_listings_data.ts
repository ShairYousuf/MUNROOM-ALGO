import { ListingDocument } from "@memorial-ece6400/mr-db-interface";

export const mock_search_listing_data: ListingDocument[] = [
  {
    listing_id: "L1",
    images: ["image1.jpg"],
    price: 100,
    beds: 2,
    baths: 1,
    name: "Cozy Apartment",
    description: "A cozy 2 bedroom apartment in the city center.",
    location: {
      latitude: 40.7128,
      longitude: 74.006
    },
    preferences: {
      pets: true,
      parties: false,
      smoking: false
    }
  },
  {
    listing_id: "L2",
    images: ["image2.jpg"],
    price: 200,
    beds: 3,
    baths: 2,
    name: "Luxury Villa",
    description: "A luxury villa with a beautiful garden.",
    location: {
      latitude: 34.0522,
      longitude: 118.2437
    },
    preferences: {
      pets: false,
      parties: true,
      smoking: false
    }
  },
  {
    listing_id: "L3",
    images: ["image3.jpg"],
    price: 150,
    beds: 2,
    baths: 2,
    name: "Modern Condo",
    description: "A modern condo with a great view of the city.",
    location: {
      latitude: 51.5074,
      longitude: 0.1278
    },
    preferences: {
      pets: false,
      parties: false,
      smoking: true
    }
  },
  {
    listing_id: "L4",
    images: ["image4.jpg"],
    price: 250,
    beds: 2,
    baths: 1,
    name: "Cozy Apartment",
    description: "A cozy 2 bedroom apartment in the city center.",
    location: {
      latitude: 48.7128,
      longitude: 79.8888
    },
    preferences: {
      pets: true,
      parties: true,
      smoking: true
    }
  },
  {
    listing_id: "L5",
    images: ["image5.jpg"],
    price: 250,
    beds: 2,
    baths: 1,
    name: "Cozy Apartment",
    description: "A cozy 2 bedroom apartment in the city center.",
    location: {
      latitude: 41.7128,
      longitude: 73.8888
    },
    preferences: {
      pets: true,
      parties: true,
      smoking: true
    }
  },
  {
    listing_id: "L6",
    images: ["image6.jpg"],
    price: 250,
    beds: 2,
    baths: 2,
    name: "Cozy Apartment",
    description: "A cozy 2 bedroom apartment in the city center.",
    location: {
      latitude: 48.7128,
      longitude: 79.8888
    },
    preferences: {
      pets: true,
      parties: true,
      smoking: true
    }
  }
];
