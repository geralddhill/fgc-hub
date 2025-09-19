import {LinkPrimary} from "@/ui/Links";

export default function Footer() {
    return (<footer className="bg-mono-200 dark:bg-mono-700 py-2 md:px-32 px-16 mt-auto">
        <p className="font-p">View this project on GitHub <LinkPrimary href="https://github.com/geralddhill/fgc-hub" target="_blank">here</LinkPrimary>.</p>
    </footer>)
}