import { isPointInPolygon } from "npm:geolib@3.3.4";
import { GeolibInputCoordinates } from 'npm:geolib@3.3.4/types';



export const filterGeoByArea = (point: GeolibInputCoordinates, area: GeolibInputCoordinates[]): boolean => {
    return isPointInPolygon(point, area);
}   