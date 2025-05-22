import {Slider} from "radix-ui";
import {useState} from "react";

export default function RadiusSlider({ onValueCommit, defaultValue }: {onValueCommit: (value: number[]) => void; defaultValue: number[]; }) {
    const [value, setValue] = useState<number>(defaultValue[0]);
    return (
        <div className="flex flex-col items-center">
            <Slider.Root
                className="relative flex h-5 w-[200px] touch-none select-none items-center hover:drop-shadow-lg transition-shadows duration-600"
                defaultValue={defaultValue}
                min={10}
                max={100}
                step={10}
                name="radius"
                onValueCommit={onValueCommit}
                onValueChange={(values) => {
                    setValue(values[0]);
                }}
            >
                <Slider.Track className="relative h-[3px] grow rounded-full bg-mono-700 dark:bg-mono-200">
                    <Slider.Range className="absolute h-full rounded-full bg-mono-800 dark:bg-mono-50"/>
                </Slider.Track>
                <Slider.Thumb
                    className="block size-5 rounded-[10px] bg-mono-800 dark:bg-mono-50 selectable focus:outline-hidden"
                    aria-label="Radius"
                />
            </Slider.Root>
            <p>Radius: {value}</p>
        </div>
    )
}