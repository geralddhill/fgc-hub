'use client'

import React from "react";
import {Chevron} from "@/ui/Icons";
import clsx from "clsx";
import VideoGameList from "@/ui/tournaments/VideoGameList";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {idToVideoGame} from "@/lib/video-game-data";

export default function VideoGameFilter() {
    const [showList, setShowList] = React.useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (id: number) => {
        const params = new URLSearchParams(searchParams);
        const games = new Set(JSON.parse(searchParams.get('g') || "[]"))

        if (games.has(id)) {
            games.delete(id);
        } else {
            games.add(id);
        }

        if (games.size === 0) {
            params.delete("g");
        } else {
            params.set("g", JSON.stringify(Array.from(games)));
        }

        params.set('p', "1")
        replace(`${pathname}?${params.toString()}`);
    }

    const buttonText = () => {
        const games: Array<number> = JSON.parse(searchParams.get('g') || "[]")
        const firstGame = idToVideoGame.get(games[0])
        let res: string;

        if (games.length === 0 || firstGame === undefined) {
            return "Select Game";
        } else {
            res = firstGame;
        }

        if (games.length > 1) {
            res += " + more";
        }

        return res;
    }

    return (<fieldset className="w-48 flex flex-col items-center space-y-4">
        <legend>
            <button className="inline-flex items-center justify-center space-x-2 btn1 selectable w-full" onClick={() => setShowList(!showList)}>
                <p>{buttonText()}</p>
                <Chevron className={clsx("w-4 fill-current transition-transform duration-500", {
                    "-rotate-180": showList
                })} />
            </button>
        </legend>
        {showList && <VideoGameList onChange={handleFilter} checked={new Set(JSON.parse(searchParams.get('g') || "[]"))} />}
    </fieldset>)
}