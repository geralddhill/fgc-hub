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

type Response = {
    message?: string;
    data?: {
        pageInfo: {
            totalPages: number;
        },
        nodes: Array<Tournament>
    };
}

const ENTRIES_PER_PAGE = 6;

export async function fetchTournamentData( query: string, location: string | null, radius: string, currentPage: number ):Promise<Response> {
    const authKey = process.env.START_GG_API_KEY;
    const url = "https://api.start.gg/gql/alpha";
    const body = {
        "query": `
            query Tournaments($currentPage: Int, $perPage: Int, $searchQuery: String!) {
              tournaments(query: {
                page: $currentPage
                perPage: $perPage
                sortBy: "startAt ASC"
                filter: {
                  name: $searchQuery
                  afterDate: ${Math.round(Date.now() / 1000)}
                  ${location ? `location: {
                    distanceFrom: "${location}",
                    distance: "${radius}"
                  }` : ""}
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
            "currentPage": currentPage,
            "perPage": ENTRIES_PER_PAGE,
            "searchQuery": query,
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
