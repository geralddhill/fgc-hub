import {Logo, LogoText} from "@/ui/Logo";

export default async function Page() {
  return (<div>
    <div className={"bg-[url(/red-bg.png)] bg-center w-full h-48 drop-shadow-lg mb-4 flex items-center justify-center"}>
      <div className="inline-flex items-center justify-center drop-shadow-lg">
        <Logo className={"object-scale-down h-32 fill-light mr-4"} />
        <LogoText className={"object-scale-down h-32 fill-light"} />
      </div>
    </div>
  </div>);
}
