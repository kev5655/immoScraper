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
