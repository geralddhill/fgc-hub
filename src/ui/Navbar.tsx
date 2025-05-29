"use client";

import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Logo, LogoText} from "@/ui/Logo";
import Link from "next/link";
import {Menu, X} from "@/ui/Icons";
import {usePathname} from "next/navigation";
import useMediaQuery from "@/lib/hooks";

export default function Navbar() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isScrollBelowTop, setIsScrollBelowTop] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(width < 48rem)");
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 0) {
                setIsNavbarVisible(false);
            } else {
                setIsNavbarVisible(true);
            }

            if (currentScrollY > 0) {
                setIsScrollBelowTop(true);
            } else {
                setIsScrollBelowTop(false);
            }

            lastScrollY = currentScrollY;
        }

        const closeDropdown = (e: MouseEvent) => {
            if (isMobileMenuOpen && !menuRef.current?.contains(e.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        }

        window.addEventListener("scroll", controlNavbar);
        document.addEventListener("mousedown", closeDropdown);

        return () => {
            window.removeEventListener("scroll", controlNavbar);
            document.removeEventListener("mousedown", closeDropdown);
        }
    }, [isMobileMenuOpen])

    const navLinks = [
        {href: "/play", label: "Play"},
        {href: "/watch", label: "Watch"},
        {href: "/learn", label: "Learn"},
        {href: "/compete", label: "Compete"},
    ]


    return (<div className={clsx("xl:w-7xl md:w-3xl md:h-28 xl:px-16 md:px-8 md:py-8 p-6 mx-auto bg-mono-50 dark:bg-mono-800 " +
        "duration-400 z-50 flex transition-all fixed left-0 right-0 overflow-hidden", {
            "translate-y-0": isNavbarVisible && !isScrollBelowTop,
            "translate-y-0 shadow-xl/15": isNavbarVisible && isScrollBelowTop,
            "-translate-y-3/2": !isNavbarVisible && !isMobileMenuOpen,
            "rounded-4xl w-xs h-20 top-6": !isMobileMenuOpen,
            "w-full h-92 pt-12 top-0 shadow-xl/15": isMobileMenuOpen
        })} ref={menuRef} id="navbar">
        <nav className="h-full md:w-full">
            <ul className="h-full md:w-full flex md:flex-row flex-col md:items-center">
                <li className="md:h-full h-8 mb-6 md:mb-0 xl:mr-8 md:mr-4" aria-current={pathname === "/" ? "page" : "false"}>
                    <Link href="/" className="flex items-center h-full space-x-2">
                        <Logo className="h-full fill-current"/>
                        <LogoText className="h-full fill-current"/>
                    </Link>
                </li>
                {navLinks.map((link) => (
                    <li key={link.href} className="md:h-full h-8 flex items-center xl:mx-6 md:mx-4 my-2"
                        aria-current={pathname === "/" ? "page" : "false"} hidden={isMobile && !isMobileMenuOpen}>
                        <Link href={link.href}>
                            <h2 className="font-h4">{link.label}</h2>
                        </Link>
                    </li>
                ))}
                <li className="md:h-full h-8 flex items-center my-2 md:ml-auto btn1"
                    aria-current={pathname === "/" ? "page" : "false"} hidden={isMobile && !isMobileMenuOpen}>
                    <Link href="/login">
                        <h2 className="font-h4">Login</h2>
                    </Link>
                </li>
            </ul>
        </nav>
        <button className="h-4 ml-auto z-51 mt-2 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "close navigation menu" : "open navigation menu"} aria-controls="navbar"
            aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X className="h-full fill-current"/> : <Menu className="h-full fill-current"/>}
        </button>
    </div>)
}