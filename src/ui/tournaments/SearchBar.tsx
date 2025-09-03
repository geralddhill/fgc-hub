import TournamentSearch from "@/ui/tournaments/TournamentSearch";
import VideoGameFilter from "@/ui/tournaments/VideoGameFilter";

export default function SearchBar() {
    return (<div className="w-full p-8 flex justify-center items-center space-x-8">
        <TournamentSearch/>
        <VideoGameFilter/>
    </div>)
}