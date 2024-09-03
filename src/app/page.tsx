import MurphStep from "@/Components/MurphStepper/MurhpStep";
import ConnectButton from "@/Components/shared/ConnectButton";

export default function Home() {
  return (
   <main className="flex flex-col items-center justify-center h-screen">
    <ConnectButton/>
    <MurphStep/>
   </main>
  );
}
