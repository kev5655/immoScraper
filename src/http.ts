import { GeoLocation, GeoLocationSchema } from "./types.ts";
import { parse } from 'npm:node-html-parser@6.1.4';

export async function geoLocationBern(): Promise<GeoLocation | null> {
    const resp = await fetch("https://api.immoscout24.ch/geo/locations-by-id?ids=geo-city-bern")

    if (!resp.ok) return null;


    const data = await resp.json();
    const parsedData = GeoLocationSchema.safeParse(data["geo-city-bern"]);
    if (parsedData.success) {
        return parsedData.data;
    } else {
        console.error(parsedData.error);
        return null;
    }
}


export async function getFirstDate() {
    const radius = 10000;
    const url = `https://www.immoscout24.ch/en/real-estate/rent/city-bern?r=${radius}&nrf=4&pt=3000`
    const resp = await fetch(url);

    if (!resp.ok) return null;

    const html = await resp.text();
    const scripts = extractScripts(html);

    console.log(JSON.stringify(scripts));
    // ...use scripts as needed...
}

function extractScripts(html: string): any {
    const root = parse(html);
    const allScripts = root.querySelectorAll('script');
    console.log(`All scripts: ${allScripts.length}`);

    const result = root.querySelectorAll('script')
        .filter(script => !script.attributes.src)
        .filter(script => script.toString().includes('window.__INITIAL_STATE__'));

    console.log(`Result len: ${result.length}`);

    if (result.length > 1) {
        console.error('More than one script found');
        throw new Error('More than one script found');
    } else if (result.length === 0) {
        console.error('No script found');
        throw new Error('No script found');
    }
    const object = result[0].innerText.replace('window.__INITIAL_STATE__=', '');
    const json = JSON.parse(object);

    return json
}