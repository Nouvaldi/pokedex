import PokemonList from "@/components/PokemonList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="fixed top-36 left-1/3 opacity-30 scale-125 h-screen">
        <div className="w-[500px] h-[500px] rounded-full border-[30px] border-gray-300 -z-50"></div>
        <div className="absolute top-[15px] left-[30px] w-[480px] h-[235px] rounded-t-full bg-gray-200 -z-20 rotate-12"></div>
        <div className="absolute top-[235px] left-[10px] w-[480px] h-[30px] bg-gray-300 -z-10 rotate-12"></div>
        <div className="absolute top-[175px] left-[175px] w-[150px] h-[150px] rounded-full bg-gray-100 border-[30px] border-gray-300 -z-10"></div>
      </div>
      <PokemonList />
    </main>
  );
}
