import { Listing, ListingSchema } from "./schema.ts";

export async function getListings(startIndex: number, size: number): Promise<Listing | null> {
    const url = "https://api.immoscout24.ch/search/listings"
    const body = {
        query: {
            availableDate: { from: "2025-02-16" },
            offerType: "RENT",
            categories: [
                "APARTMENT",
                "MAISONETTE",
                "DUPLEX",
                "ATTIC_FLAT",
                "ROOF_FLAT",
                "STUDIO",
                "SINGLE_ROOM",
                "TERRACE_FLAT",
                "BACHELOR_FLAT",
                "LOFT",
                "ATTIC",
                "HOUSE",
                "ROW_HOUSE",
                "BIFAMILIAR_HOUSE",
                "TERRACE_HOUSE",
                "VILLA",
                "FARM_HOUSE",
                "CAVE_HOUSE",
                "CASTLE",
                "GRANNY_FLAT",
                "CHALET",
                "RUSTICO",
                "SINGLE_HOUSE",
                "BUNGALOW",
                "ENGADINE_HOUSE",
                "HOBBY_ROOM",
                "CELLAR_COMPARTMENT",
                "ATTIC_COMPARTMENT",
                "FURNISHED_FLAT"
            ],
            excludeCategories: [],
            numberOfRooms: {
                from: 4
            },
            monthlyRent: {
                from: 1000,
                to: 3000
            },
            location: {
                geoTags: [
                    "geo-city-bern"
                ],
                radius: 10000
            }
        },
        sortBy: "listingType",
        sortDirection: "desc",
        from: startIndex,
        size: size,
        trackTotalHits: true,
        fieldset: "srp-list"
    }

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(body)
    })

    if (!resp.ok) {
        console.error(`Failed to fetch listings, with status code: ${resp.status} body: ${await resp.text()}`,);
        return null;
    }

    const data = await resp.json();
    const parsedData = ListingSchema.safeParse(data);
    if (parsedData.success) {
        return parsedData.data;
    }

    console.error(parsedData.error);
    return null;
}