import { area1 } from "./src/geomap.ts";
import { getListings } from "./src/http.ts";
import { isPointInPolygon } from "npm:geolib@3.3.4";
import { ListingDetails } from "./src/schema.ts";
import { filterGeoByArea } from "./src/higher-order.ts";
// import { transformToApartments } from "./src/utils.ts";



async function main() {
  let exit = false
  let startIndex = 0;
  const step = 100;
  const listings: ListingDetails[] = [];
  while (!exit) {
    const fetchedListings = await getListings(startIndex, step);
    if (fetchedListings === null) {
      console.error('Failed to fetch listings');
      return;
    }
    listings.push(...fetchedListings.results);
    if (startIndex + step > fetchedListings.total) {
      exit = true;
    }
    startIndex += step;
  }


  // console.log(listings);
  console.log(`Fetched ${listings.length} apartments`);

  const inArea = listings.filter((listing) => filterGeoByArea({
    latitude: listing.listing.address.geoCoordinates.latitude,
    longitude: listing.listing.address.geoCoordinates.longitude
  }, area1));


  console.log(`Found ${inArea.length} apartments in the area`);
  console.log(inArea);

}


await main();
