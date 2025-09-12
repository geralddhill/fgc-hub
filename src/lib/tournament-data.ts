'use server';

import {NUMBER_OF_ENTRIES_TO_FETCH} from "@/lib/utils";
import *  as z from "zod";

const Image = z.object({
    type: z.literal(["profile", "banner"]),
    url: z.string(),
    width: z.number(),
    height: z.number(),
})

const Tournament = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    startAt: z.number(),
    images: z.array(Image),
    city: z.nullable(z.string()),
    addrState: z.nullable(z.string()),
    countryCode: z.nullable(z.string()),
    isOnline: z.boolean(),
    venueAddress: z.nullable(z.string()),
    mapsPlaceId: z.nullable(z.string())
})

export type Tournament = z.infer<typeof Tournament>;

const StartggResponse = z.object({
    pageInfo: z.object({
        totalPages: z.number()
    }),
    nodes: z.array(Tournament)
})

type TournamentResponse = {
    message: string;
    data?: z.infer<typeof StartggResponse>;
}

const ZodTournamentQuery = z.object({
    query: z.string(),
    location: z.nullable(z.string()),
    radius: z.coerce.number(),
    games: z.set(z.number()),
    offset: z.number(),
})

type TournamentQuery = z.infer<typeof ZodTournamentQuery>;



export async function fetchTournamentData( tournamentQuery: TournamentQuery):Promise<TournamentResponse> {
    const {query, location, radius, games, offset} = ZodTournamentQuery.parse(tournamentQuery);

    const authKey = process.env.START_GG_API_KEY;
    const url = "https://api.start.gg/gql/alpha";
    const body = {
        "query": `
            query Tournaments($currentPage: Int, $perPage: Int, $searchQuery: String!, $videogames: [ID]) {
              tournaments(query: {
                page: $currentPage
                perPage: $perPage
                sortBy: "startAt ASC"
                filter: {
                  name: $searchQuery
                  afterDate: ${Math.round(Date.now() / 1000)}
                  ${location ? `location: {
                    distanceFrom: "${location}",
                    distance: "${radius}mi"
                  }` : ""}
                  videogameIds: $videogames
                }
              }) {
                pageInfo {
                  totalPages
                }
                nodes {
                  id
                  name
                  slug
                  startAt
                  images {
                    type
                    url
                    width
                    height
                  }
                  city
                  addrState
                  countryCode
                  isOnline
                  venueAddress
                  mapsPlaceId
                }
              }
            }`,
        "variables": {
            "currentPage": offset,
            "perPage": NUMBER_OF_ENTRIES_TO_FETCH,
            "searchQuery": query,
            "videogames": Array.from(games)
        }
    };

    try {
        console.log("Fetching tournament data...")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authKey}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            console.error(`Response status: ${response.status}`);
            return {
                message: "Failed to connect to start.gg."
            }
        }

        const json = await response.json();
        // console.log(json);

        try {
            const tournaments = StartggResponse.parse(json.data.tournaments);
            return {
                message: "Tournaments fetched successfully.",
                data: tournaments
            };
        } catch (error) {
            if(error instanceof z.ZodError) {
                console.error("ZodError:", error)
            } else {
                console.error(error)
            }

            return {
                message: 'Failed to fetch tournaments.'
            };
        }
    }
    catch (error) {
        console.error('start.gg API Error:', error);
        return {
            message: 'Failed to fetch tournaments.'
        };
    }
}