import { TopNavBar } from "./TopNavBar";

export function Watchroom() {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Watchroom!</h1>
      </div>
    </div>
  );
}