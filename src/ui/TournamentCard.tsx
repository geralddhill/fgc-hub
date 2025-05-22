import {months} from "@/lib/types";
import Image from 'next/image'
import {Thumbnail} from "@/lib/types";

export default function TournamentCard({ name, slug, startTime, thumbnail, isOnline, city, state, locationURL, className }:
{name: string; slug: string; startTime: Date; thumbnail: Thumbnail; isOnline: boolean; city?: string | null; state?: string | null;
    locationURL?: string; className?: string; }) {
    return (<div className={className + " bg-stone-200 dark:bg-stone-700 rounded-lg p-2 transition-shadows duration-600 hover:shadow-xl flex flex-wrap w-144 h-36 "}>
        <div className="h-full aspect-square mr-2">
            <Image src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} alt={"Tournament thumbnail"}
                   className="object-scale-down w-full" />
        </div>
        <div>
            <h4 className="font-h4ui">{name}</h4>
            <p>
                <span className="font-pui">{months[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}</span>
                <span className="font-pui">{" | "}</span>
                <span className="font-pui">{isOnline ? "Online" : <a href={locationURL} target="_blank">{city}, {state}</a>}</span>
            </p>
            {slug && <button className="btn1 my-2"><a target="_blank" href={"https://www.start.gg/" + slug}>View More</a></button>}
        </div>
    </div>)
}