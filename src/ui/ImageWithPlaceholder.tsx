import Image from "next/image";
import React from "react";
import clsx from "clsx";

export default function ImageWithPlaceholder({ src, width, height, alt, className }:
{ src: string; width: number; height: number; alt: string; className?: string }) {
    const [loaded, setLoaded] = React.useState(false);

    return (<div className={className + clsx({
            " bg-mono-300 dark:bg-mono-600 animate-pulse": !loaded
        })}>
        <Image src={src} width={width} height={height} alt={alt}
               className="object-contain m-auto w-full h-full block" onLoad={() => setLoaded(true)}/>
    </div>)
}