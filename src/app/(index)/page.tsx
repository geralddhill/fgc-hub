import {LinkPrimary} from "@/ui/Links";

export default async function Page() {
  return (<div className="m-16 md:m-32">
    <h1 className="font-h3">Welcome to FGC Hub!</h1>
    <p className="font-big">This website is still under construction! To use the local tournament search, please navigate to the <LinkPrimary>Compete</LinkPrimary> page!</p>

  </div>);
}
