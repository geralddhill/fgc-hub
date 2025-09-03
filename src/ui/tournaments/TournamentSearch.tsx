'use client';

import {useDebouncedCallback} from "use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import RadiusSlider from "@/ui/tournaments/RadiusSlider";
import {ButtonPrimary} from "@/ui/Buttons";

export default function TournamentSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [locationAccess, setLocationAccess] = React.useState<boolean>(Boolean(searchParams.get('l')));

    const handleQuery = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('q', query.toString());
        } else {
            params.delete('q');
        }


        replace(`${pathname}?${params.toString()}`);
    }, 300)

    const handleLocation = useDebouncedCallback(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                setLocationAccess(true);

                const { latitude, longitude } = coords;
                const location = `${latitude},${longitude}`;

                const params = new URLSearchParams(searchParams);
                if (location) {
                    params.set('l', location);
                } else {
                    params.delete('l');
                }
                replace(`${pathname}?${params.toString()}`);
            })
        } else {
            setLocationAccess(false);
        }
    }, 300)

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (!params.get('l')) {
            handleLocation();
        }
    })

    const handleRadius = useDebouncedCallback((value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('r', (value[0] || "20").toString() + "mi");
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (<div className="flex justify-center items-center md:flex-row flex-col">
            <input
                className="bg-mono-200 dark:bg-mono-700 font-big py-4 px-8 rounded-3xl md:w-144 w-80 focus:outline-hidden
                focus:shadow-md/25 focus:scale-105 selectable"
                name="query"
                placeholder="Search for tournaments"
                defaultValue={searchParams.get('q')?.toString()}
                onChange={(e) => {
                    handleQuery(e.target.value);
                }}
            />
            <div className="flex flex-col items-center space-y-4 md:mx-8 md:my-0 mx-0 my-8">
                <ButtonPrimary onClick={handleLocation} className="selectable">{locationAccess ? "Update Location" : "Use Location"}</ButtonPrimary>
                {locationAccess && <RadiusSlider defaultValue={[Number(searchParams.get('r')?.slice(0, -2) || 20)]}
                                onValueCommit={handleRadius}/>}
            </div>
    </div>)
}