import {fetchTournamentData, Tournament} from "@/lib/tournament-data";
import TournamentCard from "@/ui/TournamentCard";
import Pagination from "@/ui/Pagination";
import {Thumbnail} from "@/lib/types";
import {generateMapsURL} from "@/lib/utils";

export default async function TournamentList({ query, location, radius, currentPage }:
{query: string; location: string | null; radius: string; currentPage: number;}) {
    const response = await fetchTournamentData(query, location, radius, currentPage);
    if (!response.data) {
        return (<div>
            <p>{response.message}</p>
        </div>)
    }
    const totalPages = response.data.pageInfo.totalPages;
    const tournaments: Array<Tournament> = response.data.nodes;
    const tournamentElements = tournaments.map((tournament) => {
        const profile: Thumbnail = {
            url: "icon.svg",
            width: 500,
            height: 500
        }
        const banner: Thumbnail = {
            url: "icon.svg",
            width: 1000,
            height: 500
        };
        for (const img of tournament.images) {
            if (img.type === "profile") {
                profile.url = img.url;
                profile.width = img.width;
                profile.height = img.height;
                banner.url = img.url;
                banner.width = img.width;
                banner.height = img.height;
            }
            else {
                banner.url = img.url;
                banner.width = img.width;
                banner.height = img.height;
            }
        }

        const state = tournament.countryCode === "US" ? tournament.addrState : tournament.countryCode;
        const locationURL = generateMapsURL(tournament.venueAddress, tournament.mapsPlaceId);

        return (<li key={tournament.id}>
            <TournamentCard name={tournament.name} slug={tournament.slug} startTime={new Date(tournament.startAt * 1000)}
                            profile={profile} banner={banner} state={state} city={tournament.city} isOnline={tournament.isOnline}
                            locationURL={locationURL} address={tournament.venueAddress} />
        </li>)
    })

    return (<div className="flex flex-col items-center">
        <ul className="flex flex-col items-center">{tournamentElements}</ul>
        <Pagination totalPages={totalPages} />
    </div>);
}