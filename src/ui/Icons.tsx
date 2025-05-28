import React from 'react';
import { SVGProps } from "react"

export function Chevron(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 444.36 155.9"
            {...props}
        >
            <path
                d="M441.78 9.74c-5.34-9.25-17.27-12.45-26.52-7.11L222.23 114.07 29.11 2.59C19.86-2.75 7.93.44 2.59 9.69S.44 30.88 9.69 36.21L212 153.02c.05.03.1.06.16.09l.29.17c.08.05.17.08.26.13.45.25.92.49 1.39.71.12.06.25.11.37.16.48.21.96.4 1.46.57l.27.09c5.06 1.65 10.77 1.25 15.71-1.6L434.67 36.28c9.25-5.34 12.45-17.27 7.11-26.52Z"/>
        </svg>
    )
}
