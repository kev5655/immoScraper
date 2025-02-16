import { filterGeoByArea } from "../src/higher-order.ts";
import { area1 } from "../src/geomap.ts";
import { GeolibInputCoordinates } from 'npm:geolib@3.3.4/types';

Deno.test('filterGeoByArea should return true for a point inside the area', () => {
    const pointInside: GeolibInputCoordinates = {
        latitude: 46.954752,
        longitude: 7.448554
    };
    if (!filterGeoByArea(pointInside, area1)) {
        throw new Error('Expected point to be inside the area');
    }
});

Deno.test('filterGeoByArea should return false for a point outside the area', () => {
    const pointOutside: GeolibInputCoordinates = {
        latitude: 46.982163,
        longitude: 7.401175
    };
    if (filterGeoByArea(pointOutside, area1)) {
        throw new Error('Expected point to be outside the area');
    }
});
