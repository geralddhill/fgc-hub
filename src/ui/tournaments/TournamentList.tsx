'use client'

import {fetchTournamentData, Tournament} from "@/lib/tournament-data";
import {TournamentCard, TournamentCardSkeleton} from "@/ui/tournaments/TournamentCard";
import {Thumbnail} from "@/lib/types";
import {generateMapsURL} from "@/lib/utils";
import React from "react";
import {useInView} from "react-intersection-observer";

export function TournamentList({ query, location, radius, games, initialTournaments, locationAllowed }:
{query: string; location: string | null; radius: number; games: Set<number>; initialTournaments: Array<Tournament>;
    locationAllowed: boolean;}) {

    const [offset, setOffset] = React.useState(2)
    const [tournaments, setTournaments] = React.useState(initialTournaments);
    const [ref, inView] = useInView();
    const [noMoreEntries, setNoMoreEntries] = React.useState(false);

    const loadMoreTournaments = async () => {
        const response = await fetchTournamentData({query, location, radius, games, offset});
        const moreTournaments = response.data?.nodes || [];
        if (moreTournaments.length === 0) {
            setNoMoreEntries(true);
        }
        setTournaments(users => [...users, ...moreTournaments])
        setOffset(offset + 1)
    }

    React.useEffect(() => {
        if (inView) {
            loadMoreTournaments()
        }
    }, [inView])

    if (!locationAllowed) {
        return (<div className="flex flex-col items-center">
            <p>Please enable your location to find local tournaments near you!</p>
        </div>)
    }

    const tournamentElements = tournaments.map((tournament) => {
        const profile: Thumbnail = {
            url: "/default_tournament_profile.png",
            width: 500,
            height: 500
        }
        const banner: Thumbnail = {
            url: "/default_tournament_banner.png",
            width: 1000,
            height: 500
        };
        for (const img of tournament.images) {
            if (img.type === "profile") {
                profile.url = img.url;
                profile.width = img.width;
                profile.height = img.height;
            }
            else {
                banner.url = img.url;
                banner.width = img.width;
                banner.height = img.height;
            }
        }
        if (banner.url === "/default_tournament_banner.png" && profile.url !== "/default_tournament_profile.png") {
            banner.url = profile.url;
            banner.width = profile.width;
            banner.height = profile.height;
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
        <ul className="flex flex-row items-center justify-center flex-wrap">{tournamentElements}</ul>
        {!noMoreEntries && <div ref={ref}>
            Loading...
        </div>}
        {/*<ButtonPrimary className="mb-4" onClick={loadMoreTournaments}>Load more</ButtonPrimary>*/}
    </div>);
}

export function TournamentListSkeleton() {
    return (<div className="flex flex-col items-center">
        <ul className="flex flex-col items-center">
            <TournamentCardSkeleton />
            <TournamentCardSkeleton />
            <TournamentCardSkeleton />
            <TournamentCardSkeleton />
            <TournamentCardSkeleton />
            <TournamentCardSkeleton />
        </ul>
    </div>)
}