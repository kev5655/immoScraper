import { z } from 'npm:zod@3.24.2';

export const AddressSchema = z.object({
    geoCoordinates: z.object({
        accuracy: z.string().describe("Accuracy of the coordinates"),
        latitude: z.number().describe("Latitude of the location"),
        longitude: z.number().describe("Longitude of the location")
    }).describe("Geographical coordinates"),
    locality: z.string().describe("Locality of the address"),
    postalCode: z.string().describe("Postal code of the address"),
    street: z.string().optional().describe("Street of the address")
}).strict().describe("Address details");

export type Address = z.infer<typeof AddressSchema>;

export const CharacteristicsSchema = z.object({
    isWheelchairAccessible: z.boolean().optional().describe("Indicates if the listing is wheelchair accessible"),
    hasParking: z.boolean().optional().describe("Indicates if the listing has parking"),
    hasWashingMachine: z.boolean().optional().describe("Indicates if the listing has a washing machine"),
    hasBalcony: z.boolean().optional().describe("Indicates if the listing has a balcony"),
    numberOfFloors: z.number().optional().describe("Number of floors"),
    hasDishwasher: z.boolean().optional().describe("Indicates if the listing has a dishwasher"),
    hasFireplace: z.boolean().optional().describe("Indicates if the listing has a fireplace"),
    hasNiceView: z.boolean().optional().describe("Indicates if the listing has a nice view"),
    hasSwimmingPool: z.boolean().optional().describe("Indicates if the listing has a swimming pool"),
    hasStoreRoom: z.boolean().optional().describe("Indicates if the listing has a store room"),
    livingSpace: z.number().optional().describe("Living space in square meters"),
    numberOfRooms: z.number().describe("Number of rooms"),
    floor: z.number().optional().describe("Floor number"),
    totalFloorSpace: z.number().optional().describe("Total floor space in square meters"),
    yearBuilt: z.number().optional().describe("Year the building was built"),
    yearLastRenovated: z.number().optional().describe("Year the building was last renovated"),
    hasGarage: z.boolean().optional().describe("Indicates if the listing has a garage"),
    hasCableTv: z.boolean().optional().describe("Indicates if the listing has cable TV"),
    hasElevator: z.boolean().optional().describe("Indicates if the listing has an elevator"),
    arePetsAllowed: z.boolean().optional().describe("Indicates if pets are allowed"),
    isChildFriendly: z.boolean().optional().describe("Indicates if the listing is child-friendly"),
    distanceKindergarten: z.number().optional().describe("Distance to the kindergarten"),
    distancePrimarySchool: z.number().optional().describe("Distance to the primary school"),
    distanceHighSchool: z.number().optional().describe("Distance to the high school"),
    distanceMotorway: z.number().optional().describe("Distance to the motorway"),
    distancePublicTransport: z.number().optional().describe("Distance to public transport"),
    distanceShop: z.number().optional().describe("Distance to the shop"),
    isOldBuilding: z.boolean().optional().describe("Indicates if the building is old"),
    isQuiet: z.boolean().optional().describe("Indicates if the listing is quiet"),
    isMinergieGeneral: z.boolean().optional().describe("Indicates if the listing is Minergie general"),
    isNewBuilding: z.boolean().optional().describe("Indicates if the building is new"),
    cubage: z.number().optional().describe("Cubage of the listing"),
    hasSewageSupply: z.boolean().optional().describe("Indicates if the listing has a sewage supply"),
    numberOfToilets: z.number().optional().describe("Number of toilets"),
    hasPowerSupply: z.boolean().optional().describe("Indicates if the listing has a power supply"),
    hasIsdn: z.boolean().optional().describe("Indicates if the listing has ISDN"),
    hasWaterSupply: z.boolean().optional().describe("Indicates if the listing has a water supply"),
    numberOfBathrooms: z.number().optional().describe("Number of bathrooms"),
    hasFlatSharingCommunity: z.boolean().optional().describe("Indicates if the listing has a flat-sharing community"),
    hasPlayground: z.boolean().optional().describe("Indicates if the listing has a playground"),
    hasTumbleDryer: z.boolean().optional().describe("Indicates if the listing has a tumble dryer"),
    hasBuildingLawRestrictions: z.boolean().optional().describe("Indicates if the listing has building law restrictions"),
    hasCellar: z.boolean().optional().describe("Indicates if the listing has a cellar"),
    isGroundFloorRaised: z.boolean().optional().describe("Indicates if the ground floor is raised"),
    hasSteamer: z.boolean().optional().describe("Indicates if the listing has a steamer"),
    isMinergieCertified: z.boolean().optional().describe("Indicates if the listing is Minergie certified"),
    hasAttic: z.boolean().optional().describe("Indicates if the listing has an attic"),
    hasRailwayTerminal: z.boolean().optional().describe("Indicates if the listing has a railway terminal"),
    isMiddleHouse: z.boolean().optional().describe("Indicates if the listing is a middle house"),
    ceilingHeight: z.number().optional().describe("Ceiling height of the listing"),
    isSunny: z.boolean().optional().describe("Indicates if the listing is sunny"),
    hasRamp: z.boolean().optional().describe("Indicates if the listing has a ramp"),
    numberOfToiletsGuest: z.number().optional().describe("Number of guest toilets"),
    isUnderRoof: z.boolean().optional().describe("Indicates if the listing is under the roof"),
    isCornerHouse: z.boolean().optional().describe("Indicates if the listing is a corner house"),
    lotSize: z.number().optional().describe("Lot size in square meters"),
    numberOfApartments: z.number().optional().describe("Number of apartments"),
}).strict().describe("Characteristics of the listing");

export type Characteristics = z.infer<typeof CharacteristicsSchema>;

export const LocalizationSchema = z.object({
    urls: z.array(z.unknown()).optional().describe("URLs in German"),
    text: z.object({
        title: z.string().describe("Title in German"),
        description: z.string().describe("Description in German")
    }).describe("Text details in German"),
    attachments: z.array(z.object({
        type: z.string().describe("Type of attachment"),
        url: z.string().describe("URL of the attachment"),
        file: z.string().describe("File name of the attachment")
    })).optional().describe("Attachments in German")
}).strict().describe("Localization details in German");

export type Localization = z.infer<typeof LocalizationSchema>;

export const PriceSchema = z.object({
    rent: z.object({
        interval: z.string().describe("Rent interval"),
        net: z.number().optional().describe("Net rent amount"),
        gross: z.number().optional().describe("Gross rent amount"),
        extra: z.number().optional().describe("Extra charges")
    }).describe("Rent details"),
    currency: z.string().describe("Currency of the prices"),
    buy: z.record(z.unknown()).optional().describe("Buy details")
}).strict().describe("Price details");

export type Price = z.infer<typeof PriceSchema>;

export const ListingDetailsSchema = z.object({
    listingType: z.object({
        type: z.string().describe("Type of listing"),
    }),
    listing: z.object({
        address: AddressSchema,
        categories: z.array(z.string()).describe("Categories of the listing"),
        characteristics: CharacteristicsSchema,
        id: z.string().describe("ID of the listing"),
        localization: z.object({
            de: LocalizationSchema,
            primary: z.string().describe("Primary localization")
        }).describe("Localization details"),
        meta: z.object({
            createdAt: z.string().describe("Creation date of the listing")
        }).describe("Meta information"),
        offerType: z.string().describe("Type of offer"),
        platforms: z.array(z.string()).describe("Platforms where the listing is available"),
        prices: PriceSchema,
        valueAddedServices: z.object({
            bundle: z.string().optional().describe("Value-added services bundle")
        }).optional().describe("Value-added services")
    }).describe("Listing details"),
    listingCard: z.object({
        size: z.string().describe("Size of the listing card")
    }),
    id: z.string().describe("ID of the listing"),
    listingScores: z.object({
        listingCompletenessScore: z.number().describe("Listing completeness score"),
        packageScore: z.number().describe("Package score")
    }),
    listerBranding: z.object({
        isQualityPartner: z.boolean().describe("Indicates if the lister is a quality partner")
    }),
    remoteViewing: z.boolean().describe("Indicates if remote viewing is available"),
    newConstructionData: z.record(z.unknown()).optional().describe("New construction data"),
}).strict().describe("Real estate listing details");

export type ListingDetails = z.infer<typeof ListingDetailsSchema>;

export const ListingSchema = z.object({
    from: z.number().describe("Start index of the listing"),
    size: z.number().describe("Size of the listing"),
    total: z.number().describe("Total number of listings"),
    results: z.array(ListingDetailsSchema).describe("Array of listings")
}).describe("Schema for real estate listings");

export type Listing = z.infer<typeof ListingSchema>;