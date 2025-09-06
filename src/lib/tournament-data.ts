'use server';

import {NUMBER_OF_ENTRIES_TO_FETCH} from "@/lib/utils";
import *  as z from "zod";

export type Tournament = {
    id: number;
    name: string;
    slug: string;
    startAt: number;
    images: Array<{
        type: "profile" | "banner";
        url: string;
        width: number;
        height: number;
    }>;
    city: string | null;
    addrState: string | null;
    countryCode: string | null;
    isOnline: boolean;
    venueAddress: string | null;
    mapsPlaceId: string | null;
}

type TournamentResponse = {
    message: string;
    data?: {
        pageInfo: {
            totalPages: number;
        },
        nodes: Array<Tournament>
    };
}

type TournamentQuery = {
    query: string;
    location: string | null;
    radius: string;
    games: Set<number>;
    offset: number;
}

const ZodTournamentQuery = z.object({
    query: z.string(),
    location: z.nullable(z.string()),
    radius: z.coerce.number(),
    games: z.set(z.number()),
    offset: z.number(),
})



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
        console.log(json);
        return {
            message: "Tournaments fetched successfully.",
            data: json.data.tournaments
        };
    }
    catch (error) {
        console.error('start.gg API Error:', error);
        return {
            message: 'Failed to fetch tournaments.'
        };
    }
}