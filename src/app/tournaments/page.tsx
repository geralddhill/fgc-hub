import {TournamentList, TournamentListSkeleton} from "@/ui/TournamentList";
import type {Metadata} from "next";
import {Suspense} from "react";
import SearchBar from "@/ui/SearchBar";

export const metadata: Metadata = {
    title: "Tournaments",
}

export default async function Page(props: {
    searchParams?: Promise<{
        q?: string;
        p?: string;
        l?: string;
        r?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.q || "";
    const location = searchParams?.l || null;
    const radius = searchParams?.r || "20mi";
    const currentPage = Number(searchParams?.p) || 1;

    return (<div>
        <SearchBar />
        <Suspense key={JSON.stringify(searchParams)} fallback={<TournamentListSkeleton/>}>
            <TournamentList query={query} location={location} radius={radius} currentPage={currentPage} />
        </Suspense>
    </div>);
}
