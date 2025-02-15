import { z } from 'npm:zod@3.24.2';

export const GeoLocationSchema = z.object({
    id: z.string(),
    names: z.object({
        de: z.array(z.string()),
        fr: z.array(z.string()),
        it: z.array(z.string()),
        en: z.array(z.string())
    }),
    urlNames: z.object({
        it: z.string(),
        fr: z.string(),
        de: z.string(),
        en: z.string()
    }),
    children: z.array(z.string()),
    parentPaths: z.array(z.array(z.string())),
    type: z.string(),
    typeLabel: z.object({
        de: z.string(),
        fr: z.string(),
        it: z.string(),
        en: z.string()
    }),
    preposition: z.object({
        de: z.string(),
        fr: z.string(),
        it: z.string(),
        en: z.string()
    }),
    area: z.number(),
    center: z.object({
        lat: z.number(),
        lon: z.number()
    }),
    bounds: z.array(z.number()),
    is24UrlNames: z.object({
        de: z.string(),
        fr: z.string(),
        it: z.string(),
        en: z.string()
    }),
    wikidataId: z.string(),
    newId: z.string(),
    hg5: z.object({
        de: z.string(),
        en: z.string(),
        fr: z.string(),
        it: z.string()
    })
});

export type GeoLocation = z.infer<typeof GeoLocationSchema>;

export const RealEstateListingSchema = z.object({
    features: z.record(z.unknown()).describe("Features of the real estate listing"),
    listing: z.record(z.unknown()).describe("Details of the listing"),
    newConstruction: z.record(z.unknown()).describe("Information about new constructions"),
    listerBranding: z.record(z.unknown()).describe("Branding information of the lister"),
    listingImageGallery: z.record(z.unknown()).describe("Image gallery of the listing"),
    contactForm: z.record(z.unknown()).describe("Contact form details"),
    resultList: z.object({
        search: z.object({
            preSearch: z.object({
                result: z.unknown().optional().describe("Pre-search result"),
                searchModel: z.unknown().optional().describe("Pre-search model"),
                dataFetchError: z.unknown().optional().describe("Error during data fetch"),
                isLoading: z.boolean().describe("Loading state"),
            }).describe("Pre-search details"),
            fullSearch: z.object({
                result: z.object({
                    hasNextPage: z.boolean().describe("Indicates if there is a next page"),
                    hasPreviousPage: z.boolean().describe("Indicates if there is a previous page"),
                    itemsPerPage: z.number().describe("Number of items per page"),
                    listings: z.array(z.object({
                        listingType: z.object({
                            type: z.string().describe("Type of the listing"),
                        }).describe("Type details of the listing"),
                        listing: z.object({
                            address: z.object({
                                geoCoordinates: z.object({
                                    accuracy: z.string().describe("Accuracy of the coordinates"),
                                    latitude: z.number().describe("Latitude of the location"),
                                    longitude: z.number().describe("Longitude of the location")
                                }).describe("Geographical coordinates"),
                                locality: z.string().describe("Locality of the address"),
                                postalCode: z.string().describe("Postal code of the address"),
                                street: z.string().describe("Street of the address")
                            }).describe("Address details"),
                            categories: z.array(z.string()).describe("Categories of the listing"),
                            characteristics: z.object({
                                isWheelchairAccessible: z.boolean().optional().describe("Indicates if the listing is wheelchair accessible"),
                                hasParking: z.boolean().optional().describe("Indicates if the listing has parking"),
                                hasWashingMachine: z.boolean().optional().describe("Indicates if the listing has a washing machine"),
                                hasBalcony: z.boolean().optional().describe("Indicates if the listing has a balcony"),
                                livingSpace: z.number().describe("Living space in square meters"),
                                numberOfRooms: z.number().describe("Number of rooms"),
                                floor: z.number().optional().describe("Floor number"),
                                yearBuilt: z.number().optional().describe("Year the building was built"),
                                yearLastRenovated: z.number().optional().describe("Year the building was last renovated"),
                                hasGarage: z.boolean().optional().describe("Indicates if the listing has a garage"),
                                hasCableTv: z.boolean().optional().describe("Indicates if the listing has cable TV")
                            }).describe("Characteristics of the listing"),
                            id: z.string().describe("ID of the listing"),
                            localization: z.object({
                                de: z.object({
                                    urls: z.array(z.unknown()).optional().describe("URLs in German"),
                                    text: z.object({
                                        title: z.string().describe("Title in German"),
                                        description: z.string().describe("Description in German")
                                    }).describe("Text details in German"),
                                    attachments: z.array(z.object({
                                        type: z.string().describe("Type of attachment"),
                                        url: z.string().describe("URL of the attachment"),
                                        file: z.string().describe("File name of the attachment")
                                    })).describe("Attachments in German")
                                }).describe("Localization details in German"),
                                primary: z.string().describe("Primary localization")
                            }).describe("Localization details"),
                            meta: z.object({
                                createdAt: z.string().describe("Creation date of the listing")
                            }).describe("Meta information"),
                            offerType: z.string().describe("Type of offer"),
                            platforms: z.array(z.string()).describe("Platforms where the listing is available"),
                            prices: z.object({
                                rent: z.object({
                                    interval: z.string().describe("Rent interval"),
                                    net: z.number().optional().describe("Net rent amount"),
                                    gross: z.number().describe("Gross rent amount"),
                                    extra: z.number().optional().describe("Extra charges")
                                }).describe("Rent details"),
                                currency: z.string().describe("Currency of the prices"),
                                buy: z.record(z.unknown()).optional().describe("Buy details")
                            }).describe("Price details"),
                            valueAddedServices: z.object({
                                bundle: z.string().describe("Value-added services bundle")
                            }).optional().describe("Value-added services")
                        }).describe("Listing details")
                    }).describe("Array of listings"))
                }).describe("Full search result"),
            }).describe("Full search details"),
            searchModel: z.object({
                sortType: z.string().describe("Sort type"),
                sortDirection: z.string().describe("Sort direction"),
                chooseType: z.string().describe("Choose type"),
                offerType: z.string().describe("Offer type"),
                locations: z.array(z.string()).describe("Array of locations"),
                radius: z.number().describe("Search radius"),
                page: z.number().describe("Page number"),
                pageSize: z.number().describe("Page size"),
                priceRange: z.object({
                    to: z.number().describe("Maximum price")
                }).describe("Price range"),
                numberOfRooms: z.object({
                    from: z.number().describe("Minimum number of rooms")
                }).describe("Number of rooms"),
                facilitiesRequired: z.array(z.unknown()).describe("Required facilities"),
                objectTypes: z.array(z.unknown()).describe("Object types")
            }).optional().describe("Search model"),
            dataFetchError: z.unknown().optional().describe("Error during data fetch"),
            isLoading: z.boolean().optional().describe("Loading state"),
        }).describe("Search details"),
        showSaveSearchAction: z.boolean().describe("Indicates if the save search action is shown"),
        isMapViewSelected: z.unknown().optional().describe("Indicates if the map view is selected"),
    }).describe("Result list details"),
    searchBar: z.object({
        searchModel: z.object({
            sortType: z.string().describe("Sort type"),
            sortDirection: z.string().describe("Sort direction"),
            chooseType: z.string().describe("Choose type"),
            offerType: z.string().describe("Offer type"),
            locations: z.array(z.string()).describe("Array of locations"),
            radius: z.number().describe("Search radius"),
            page: z.number().describe("Page number"),
            pageSize: z.number().describe("Page size"),
            priceRange: z.object({
                to: z.number().describe("Maximum price")
            }).describe("Price range"),
            numberOfRooms: z.object({
                from: z.number().describe("Minimum number of rooms")
            }).describe("Number of rooms"),
            facilitiesRequired: z.array(z.unknown()).describe("Required facilities"),
            objectTypes: z.array(z.unknown()).describe("Object types")
        }).describe("Search model"),
        dataFetchError: z.unknown().optional().describe("Error during data fetch"),
        isLoading: z.boolean().optional().describe("Loading state"),
    }).describe("Search bar details"),
    saveSearchSubscription: z.object({
        model: z.object({
            subscription: z.string().optional().describe("Subscription details"),
            email: z.unknown().optional().describe("Email details"),
            subscribeToNewsletter: z.boolean().describe("Indicates if subscribed to newsletter"),
            isPremiumPackageSelected: z.boolean().describe("Indicates if premium package is selected"),
        }).describe("Save search subscription model")
    }).describe("Save search subscription details"),
    geo: z.object({
        geoLocations: z.array(z.object({
            id: z.string().describe("ID of the geo location"),
            type: z.string().describe("Type of the geo location"),
            names: z.object({
                de: z.array(z.string()).describe("Names in German"),
                fr: z.array(z.string()).describe("Names in French"),
                it: z.array(z.string()).describe("Names in Italian"),
                en: z.array(z.string()).describe("Names in English")
            }).describe("Names in different languages"),
            urlNames: z.object({
                it: z.string().describe("URL name in Italian"),
                fr: z.string().describe("URL name in French"),
                de: z.string().describe("URL name in German"),
                en: z.string().describe("URL name in English")
            }).optional().describe("URL names in different languages"),
            parentPaths: z.array(z.array(z.string())).describe("Parent paths"),
            children: z.array(z.string()).describe("Children locations"),
            typeLabel: z.object({
                de: z.string().describe("Type label in German"),
                fr: z.string().describe("Type label in French"),
                it: z.string().describe("Type label in Italian"),
                en: z.string().describe("Type label in English")
            }).describe("Type labels in different languages"),
            preposition: z.object({
                de: z.string().describe("Preposition in German"),
                fr: z.string().describe("Preposition in French"),
                it: z.string().describe("Preposition in Italian"),
                en: z.string().describe("Preposition in English")
            }).describe("Prepositions in different languages"),
            wikidataId: z.string().optional().describe("Wikidata ID"),
            is24UrlNames: z.object({
                de: z.string().describe("URL name in German for is24"),
                fr: z.string().describe("URL name in French for is24"),
                it: z.string().describe("URL name in Italian for is24"),
                en: z.string().describe("URL name in English for is24")
            }).describe("URL names for is24 in different languages"),
            newId: z.string().describe("New ID of the geo location"),
        }).optional()).describe("Array of geo locations"),
        unresolvableGeoIds: z.array(z.unknown()).describe("Array of unresolvable geo IDs"),
        unresolvableUrlNames: z.object({
            de: z.array(z.unknown()).describe("Unresolvable URL names in German"),
            en: z.array(z.unknown()).describe("Unresolvable URL names in English"),
            fr: z.array(z.unknown()).describe("Unresolvable URL names in French"),
            it: z.array(z.unknown()).describe("Unresolvable URL names in Italian")
        }).describe("Unresolvable URL names in different languages"),
        autocompleteResults: z.array(z.unknown()).describe("Autocomplete results"),
    }).describe("Geo details"),
    geoExtra: z.object({
        geoExtraLocations: z.object({}).describe("Extra geo locations")
    }).describe("Geo extra details"),
    favourites: z.object({
        isFavouritesEnabled: z.boolean().describe("Indicates if favourites are enabled"),
        favouritesModuleStatus: z.number().describe("Status of the favourites module"),
        favouriteListingDescriptors: z.array(z.unknown()).describe("Array of favourite listing descriptors"),
        favouritesListId: z.unknown().optional().describe("ID of the favourites list"),
        listingIdAwaitingLogin: z.unknown().optional().describe("ID of the listing awaiting login"),
    }).describe("Favourites details"),
    split: z.object({
        treatments: z.record(z.unknown()).describe("Split treatments"),
        splitSessionKey: z.string().describe("Split session key"),
    }).describe("Split details"),
    splitFlagSet: z.object({
        fetchedFlagSet: z.array(z.unknown()).describe("Fetched flag set"),
    }).optional().describe("Split flag set details"),
    layoutSolution: z.object({
        isActive: z.boolean().describe("Indicates if the layout solution is active"),
        agencyConfiguration: z.unknown().optional().describe("Agency configuration"),
    }).describe("Layout solution details"),
    agencyProfile: z.object({
        agencyProfileFetch: z.object({
            result: z.unknown().optional().describe("Result of the agency profile fetch"),
            isLoading: z.boolean().describe("Loading state of the agency profile fetch"),
            dataFetchError: z.unknown().optional().describe("Error during data fetch of the agency profile"),
        }).describe("Agency profile fetch details"),
        activeAgentsFetch: z.object({
            result: z.unknown().optional().describe("Result of the active agents fetch"),
            isLoading: z.boolean().describe("Loading state of the active agents fetch"),
            dataFetchError: z.unknown().optional().describe("Error during data fetch of the active agents"),
        }).describe("Active agents fetch details"),
        resultListSearchModel: z.unknown().optional().describe("Result list search model"),
        search: z.object({
            buySearch: z.object({
                result: z.unknown().optional().describe("Result of the buy search"),
                isLoading: z.boolean().optional().describe("Loading state of the buy search"),
                dataFetchError: z.unknown().optional().describe("Error during data fetch of the buy search"),
            }).describe("Buy search details"),
            rentSearch: z.object({
                result: z.unknown().optional().describe("Result of the rent search"),
                isLoading: z.boolean().describe("Loading state of the rent search"),
                dataFetchError: z.unknown().optional().describe("Error during data fetch of the rent search"),
            }).describe("Rent search details"),
            fullSearch: z.object({
                result: z.unknown().optional().describe("Result of the full search"),
                isLoading: z.boolean().describe("Loading state of the full search"),
                dataFetchError: z.unknown().optional().describe("Error during data fetch of the full search"),
            }).describe("Full search details"),
        }).describe("Search details"),
        propertyCount: z.object({
            buySearch: z.object({
                result: z.unknown().optional().describe("Result of the buy search property count"),
                isLoading: z.boolean().describe("Loading state of the buy search property count"),
                dataFetchError: z.unknown().optional().describe("Error during data fetch of the buy search property count"),
            }).describe("Buy search property count details"),
            rentSearch: z.object({
                result: z.unknown().optional().describe("Result of the rent search property count"),
                isLoading: z.boolean().describe("Loading state of the rent search property count"),
                dataFetchError: z.unknown().optional().describe("Error during data fetch of the rent search property count"),
            }).describe("Rent search property count details"),
        }).describe("Property count details"),
    }).describe("Agency profile details"),
    searchAlerts: z.object({
        activatedSearchAlerts: z.array(z.unknown()).describe("Array of activated search alerts"),
        searchAlertsIsLoading: z.boolean().describe("Loading state of the search alerts"),
    }).describe("Search alerts details"),
    map: z.object({
        viewport: z.unknown().optional().describe("Viewport details"),
        selectedId: z.unknown().optional().describe("Selected ID"),
        selectedAggregateListingRecord: z.unknown().optional().describe("Selected aggregate listing record"),
        largeViewport: z.unknown().optional().describe("Large viewport details"),
        mapSettings: z.object({
            isMarkerLayerEnabled: z.boolean().describe("Indicates if the marker layer is enabled"),
            isMapDetailsOpen: z.boolean().describe("Indicates if the map details are open"),
        }).describe("Map settings"),
    }).describe("Map details"),
    travelTime: z.object({
        data: z.unknown().optional().describe("Travel time data"),
        customPOIData: z.object({}).describe("Custom POI data"),
    }).describe("Travel time details"),
    seo: z.record(z.unknown()).describe("SEO details"),
    contactFormBehindAccount: z.object({
        currentListing: z.string().describe("Current listing details")
    }).describe("Contact form behind account details"),
    regionalHighlight: z.object({
        regionalHighlightFetch: z.object({
            result: z.unknown().optional().describe("Result of the regional highlight fetch"),
            isLoading: z.boolean().describe("Loading state of the regional highlight fetch"),
            dataFetchError: z.unknown().optional().describe("Error during data fetch of the regional highlight"),
        }).describe("Regional highlight fetch details"),
    }).describe("Regional highlight details")
}).describe("Schema for real estate listings");

export type RealEstateListing = z.infer<typeof RealEstateListingSchema>;