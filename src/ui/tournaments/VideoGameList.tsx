import {videoGames} from "@/lib/video-game-data";

export default function VideoGameList({ onChange, checked }: { onChange: (id: number) => void; checked: Set<number> }) {
    const gameElements = videoGames.map((game) => {
        return (<label key={game.id} className="w-full h-8" htmlFor={game.id.toString()}>
            <div className="inline-flex items-center has-checked:bg-mono-300 has-checked:dark:bg-mono-600 w-full h-full p-2">
                <input id={game.id.toString()} name={game.id.toString()} type="checkbox" className="hidden" onChange={() => {
                    onChange(game.id);
                }} checked={checked.has(game.id)} />
                {game.name}
            </div>
        </label>)
    })

    return (<div className="w-80 max-h-48 bg-mono-200 dark:bg-mono-700 relative flex flex-col overflow-y-auto overflow-x-hidden rounded-lg scale-105">
    {gameElements}
    </div>)
}