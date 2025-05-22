import {Slider} from "radix-ui";
import {useState} from "react";

export default function RadiusSlider({ onValueCommit, defaultValue }: {onValueCommit: (value: number[]) => void; defaultValue: number[]; }) {
    const [value, setValue] = useState<number>(defaultValue[0]);
    return (
        <div>
            <Slider.Root
                className="relative flex h-5 w-[200px] touch-none select-none items-center"
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
                <Slider.Track className="relative h-[3px] grow rounded-full bg-foreground-lc">
                    <Slider.Range className="absolute h-full rounded-full bg-foreground"/>
                </Slider.Track>
                <Slider.Thumb
                    className="block size-5 rounded-[10px] bg-foreground shadow-[0_2px_10px] hover:bg-foreground-lc focus:shadow-[0_0_0_5px] focus:outline-none"
                    aria-label="Radius"
                />
            </Slider.Root>
            {value}
        </div>
    )
}