import {TournamentList, TournamentListSkeleton} from "@/ui/tournaments/TournamentList";
import type {Metadata} from "next";
import {Suspense} from "react";
import SearchBar from "@/ui/tournaments/SearchBar";
import {fetchTournamentData, Tournament} from "@/lib/tournament-data";

export const metadata: Metadata = {
    title: "Tournaments",
}




export default async function Page(props: {
    searchParams?: Promise<{
        q?: string;
        l?: string;
        r?: string;
        g?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.q || "";
    const location = searchParams?.l || null;
    const radius = searchParams?.r || "20";
    const games: Set<number> = new Set(JSON.parse(searchParams?.g || "[]"))

    const response = await fetchTournamentData({query, location, radius, games, offset: 1});
    if (!response.data) {
        return (<div>
            <p>{response.message}</p>
        </div>)
    }

    const tournaments: Array<Tournament> = response.data.nodes;

    return (<div>
        <SearchBar />
        <Suspense key={JSON.stringify(searchParams)} fallback={<TournamentListSkeleton/>}>
            <TournamentList query={query} location={location} radius={radius} games={games} initialTournaments={tournaments} locationAllowed={location != null} />
        </Suspense>
    </div>);
}
