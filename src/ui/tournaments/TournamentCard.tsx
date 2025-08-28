'use client'

import {months} from "@/lib/types";
import Image from 'next/image'
import {Thumbnail} from "@/lib/types";
import React, {MouseEventHandler} from "react";
import ImageWithPlaceholder from "@/ui/ImageWithPlaceholder";
import {ButtonPrimary} from "@/ui/Buttons";

export function TournamentCard({ name, slug, startTime, profile, banner, isOnline, city, state, address, locationURL}:
{name: string; slug: string; startTime: Date; profile: Thumbnail; banner: Thumbnail; isOnline: boolean; city?: string | null; state?: string | null;
    address?: string | null; locationURL?: string; }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }
    const stopPropagation: MouseEventHandler = (e) => {
        e.stopPropagation();
    }

    if (expanded) {
        return (<div className="m-4 bg-mono-200 dark:bg-mono-700 rounded-lg shadow-lg/10 w-144 hover:scale-105 hover:shadow-lg/25 transition duration-250">
            <div onClick={handleClick} className="overflow-hidden p-2 transition-[height] duration-250 flex flex-col h-144 w-full">
                    <ImageWithPlaceholder src={banner.url} width={banner.width} height={banner.height} alt={"Tournament thumbnail"}
                           className="max-h-70 w-full overflow-hidden rounded-lg margin-auto"/>
                    <div>
                        <h4 className="font-h4ui">{name.length <= 36 ? name : name.substring(0, 36) + "..."}</h4>
                        <p className="font-pui text-mono-600 dark:text-mono-200">{months[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}</p>
                        {isOnline ? "Online" : <button className="font-pui text-mono-600 dark:text-mono-200 cursor-pointer"
                                                       onClick={stopPropagation}><a href={locationURL} target="_blank">{expanded ? address : `${city}, ${state}`}</a></button>}
                    </div>
                {slug && <ButtonPrimary onClick={stopPropagation} className="m-4"><a href={`https://www.start.gg/${slug}`} target="_blank">View on start.gg</a></ButtonPrimary>}
                </div>
        </div>)
    }

    return (<div className="m-4 bg-mono-200 dark:bg-mono-700 rounded-lg w-144 selectable group">
        <div onClick={handleClick} className="p-2 transition-[height] duration-250 h-36 flex flex-row space-x-3">
                <Image src={profile.url} width={profile.width} height={profile.height} alt={"Tournament thumbnail"}
                           className="object-scale-down w-32 h-32 overflow-hidden rounded-lg"/>
            <div>
                <h4 className="font-h4ui">{name.length <= 36 ? name : name.substring(0, 36) + "..."}</h4>
                <div className="inline font-pui text-mono-600 dark:text-mono-300 ">
                    <span>{months[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}</span>
                    <span>{" | "}</span>
                    {isOnline ? "Online" : <button className="cursor-pointer"
                                                   onClick={stopPropagation}><a href={locationURL}
                                                                                target="_blank">{expanded ? address : `${city}, ${state}`}</a>
                    </button>}
                </div>
                <p className="font-pui my-2 text-color-500 dark:text-color-600 group-hover:text-mono-800 dark:group-hover:text-mono-50 transition duration-250">View
                    More</p>
            </div>
        </div>
    </div>)
}

export function TournamentCardSkeleton() {
    return (<div className="m-4 bg-mono-200 dark:bg-mono-700 rounded-lg w-144 h-36">
        <div className="flex flex-row space-x-3 animate-pulse p-2">
            <div className="w-32 h-32 aspect-square bg-mono-300 dark:bg-mono-600 rounded-lg" />
            <div className="w-full h-full">
                <div className="w-full bg-mono-300 dark:bg-mono-600 rounded-3xl">
                    <h4 className="font-h4ui opacity-0">Header</h4>
                </div>
                <div className="w-1/2 bg-mono-300 dark:bg-mono-600 rounded-3xl">
                    <p className="font-pui opacity-0">Info</p>
                </div>
                <div className="w-1/5 bg-mono-300 dark:bg-mono-600 rounded-3xl">
                    <p className="font-pui opacity-0">CTA</p>
                </div>
            </div>
        </div>
    </div>)
}