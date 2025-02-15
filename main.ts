import { fetchGeoLocationBern, fetchRealEstateListings } from "./src/http.ts";



async function main() {
  await fetchRealEstateListings();
}


await main();