import {AnchorHTMLAttributes} from "react";
import {cn} from "@/lib/utils";

export function LinkPrimary({className, children, ...props}: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (<a {...props} className={cn("cursor-pointer text-color-600 active:text-color-700 dark:text-color-500" +
        "dark:active:text-color-400 font-semibold", className)}>
        {children}
    </a>)
}

export function LinkSecondary({className, children, ...props}: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (<a {...props} className={cn("cursor-pointer text-mono-800 active:text-mono-700 dark:text-mono-50" +
        " dark:active:text-mono-200 font-semibold", className)}>
        {children}
    </a>)
}