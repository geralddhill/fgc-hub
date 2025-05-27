import TournamentSearch from "@/ui/TournamentSearch";
import VideoGameFilter from "@/ui/VideoGameFilter";

export default function SearchBar() {
    return (<div className="w-full bg-mono-300 dark:bg-mono-900 p-8 flex justify-center items-center space-x-8">
        <TournamentSearch/>
        <VideoGameFilter/>
    </div>)
}