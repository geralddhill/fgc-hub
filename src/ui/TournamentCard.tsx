'use client'

import {months} from "@/lib/types";
import Image from 'next/image'
import {Thumbnail} from "@/lib/types";
import React, {MouseEventHandler} from "react";
import clsx from "clsx";

export default function TournamentCard({ name, slug, startTime, profile, banner, isOnline, city, state, address, locationURL}:
{name: string; slug: string; startTime: Date; profile: Thumbnail; banner: Thumbnail; isOnline: boolean; city?: string | null; state?: string | null;
    address?: string | null; locationURL?: string; }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }
    const stopPropogation: MouseEventHandler = (e) => {
        e.stopPropagation();
    }

    if (expanded) {
        return (<div className="m-4 bg-mono-200 dark:bg-mono-700 rounded-lg shadow-lg/10 w-144 hover:scale-105 hover:shadow-lg/25 transition duration-250">
            <div onClick={handleClick} className="overflow-hidden p-2 transition-[height] duration-250 flex flex-col h-144 w-full">
                <div className="w-full aspect-2/1">
                    <Image src={banner.url} width={banner.width} height={banner.height} alt={"Tournament thumbnail"}
                           className="object-scale-down h-full w-full block"/>
                </div>
                    <div>
                        <h4 className="font-h4ui">{name.length <= 36 ? name : name.substring(0, 36) + "..."}</h4>
                        <p className="font-pui text-mono-600 dark:text-mono-200">{months[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}</p>
                        {isOnline ? "Online" : <button className="font-pui text-mono-600 dark:text-mono-200 cursor-pointer"
                                                       onClick={stopPropogation}><a href={locationURL} target="_blank">{expanded ? address : `${city}, ${state}`}</a></button>}
                    </div>
                </div>
        </div>)
    }

    return (<div className="m-4 bg-mono-200 dark:bg-mono-700 rounded-lg w-144 selectable group">
        <div onClick={handleClick} className="p-2 transition-[height] duration-250 h-36 flex flex-row space-x-3">
                <Image src={profile.url} width={profile.width} height={profile.height} alt={"Tournament thumbnail"}
                           className="object-scale-down w-32 h-32"/>
            <div>
                <h4 className="font-h4ui">{name.length <= 36 ? name : name.substring(0, 36) + "..."}</h4>
                <div className="inline font-pui text-mono-600 dark:text-mono-300 ">
                    <span>{months[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}</span>
                    <span>{" | "}</span>
                    {isOnline ? "Online" : <button className="cursor-pointer"
                                                   onClick={stopPropogation}><a href={locationURL}
                                                                                target="_blank">{expanded ? address : `${city}, ${state}`}</a>
                    </button>}
                </div>
                <p className="font-pui my-2 text-color-500 dark:text-color-600 group-hover:text-mono-800 dark:group-hover:text-mono-50 transition duration-250">View
                    More</p>
            </div>
        </div>
    </div>)
}