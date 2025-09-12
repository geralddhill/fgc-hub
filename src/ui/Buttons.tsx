import {ButtonHTMLAttributes} from "react";
import {cn} from "@/lib/utils";


export function ButtonPrimary({className, children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (<button {...props} className={cn("cursor-pointer bg-color-500 active:bg-color-600 border-color-500" +
        " active:border-color-600 dark:bg-color-700 dark:active:bg-color-600 dark:border-color-700 dark:active:border-color-600" +
        " text-mono-50 px-6 py-2 rounded-4xl duration-600 font-semibold", className)}>
        {children}
    </button>)
}

export function ButtonSecondary({className, children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (<button {...props} className={cn("cursor-pointer border-color-500 text-color-500 active:border-color-600" +
        " active:text-color-600 dark:border-color-600 dark:text-color-600 dark:active:border-color-500 dark:active:text-color-500" +
        " px-6 py-2 rounded-4xl border-4 border-solid hover:shadow-xl transition-shadow duration-600 font-semibold", className)}>
        {children}
    </button>)
}