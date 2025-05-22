import {Switch} from "@headlessui/react";

export default function ToggleSwitch({ checked, onChange }: {checked: boolean, onChange: (checked: boolean) => void}) {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-background-lc p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-color1 data-focus:outline data-focus:outline-foreground"
        >
            <span className="sr-only">Toggle Upcoming Tournaments</span>
            <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-foreground shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
            />
        </Switch>
    )
}