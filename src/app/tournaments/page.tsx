import TournamentList from "@/ui/TournamentList";
import TournamentSearch from "@/ui/TournamentSearch";
import type {Metadata} from "next";

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
        <TournamentSearch />
        <TournamentList query={query} location={location} radius={radius} currentPage={currentPage} />
    </div>);
}
