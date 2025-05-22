'use client';

import {useDebouncedCallback} from "use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from "react";
import RadiusSlider from "@/ui/RadiusSlider";

export default function TournamentSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [showRadius, setShowRadius] = React.useState<boolean>(Boolean(searchParams.get('l')));

    const handleQuery = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('q', query.toString());
        } else {
            params.delete('q');
        }


        params.set('p', "1")
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    const handleLocation = useDebouncedCallback(() => {
        setShowRadius(true);
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                const location = `${latitude},${longitude}`;

                const params = new URLSearchParams(searchParams);
                if (location) {
                    params.set('l', location);
                } else {
                    params.delete('l');
                }
                params.set('p', "1")
                replace(`${pathname}?${params.toString()}`);
            })
        }
    }, 300)

    const handleRadius = useDebouncedCallback((value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('r', (value[0] || "20").toString() + "mi");
        params.set('p', "1")
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (<div className="m-8">
        <input
            className="bg-stone-200 dark:bg-stone-700 font-big py-4 px-8 rounded-3xl w-144 focus:outline-hidden
            focus:shadow-xl transition-shadow duration-600"
            name="query"
            placeholder="Search for tournaments"
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => {
                handleQuery(e.target.value);
            }}
        />
        <button onClick={handleLocation} className="btn2">Use my location</button>
        {showRadius && <RadiusSlider defaultValue={[Number(searchParams.get('r')?.slice(0, -2) || 20)]}
                       onValueCommit={handleRadius}/>}
    </div>)
}