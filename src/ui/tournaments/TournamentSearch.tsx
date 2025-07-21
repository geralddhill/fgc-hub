'use client';

import {useDebouncedCallback} from "use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from "react";
import RadiusSlider from "@/ui/tournaments/RadiusSlider";
import {ButtonPrimary} from "@/ui/Buttons";

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

    return (<div className="flex justify-center items-center space-x-8">
            <input
                className="bg-mono-200 dark:bg-mono-700 font-big py-4 px-8 rounded-3xl w-144 focus:outline-hidden
                focus:shadow-md/25 focus:scale-105 selectable"
                name="query"
                placeholder="Search for tournaments"
                defaultValue={searchParams.get('q')?.toString()}
                onChange={(e) => {
                    handleQuery(e.target.value);
                }}
            />
            <div className="flex flex-col items-center space-y-4">
                <ButtonPrimary onClick={handleLocation} className="selectable">Use my location</ButtonPrimary>
                {showRadius && <RadiusSlider defaultValue={[Number(searchParams.get('r')?.slice(0, -2) || 20)]}
                                onValueCommit={handleRadius}/>}
            </div>
    </div>)
}