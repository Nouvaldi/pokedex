import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "./ui/progress";

export interface Pokemon {
  name: string;
  url: string;
}

interface Ability {
  ability: { name: string };
}

interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonData {
  height: number;
  weight: number;
  abilities: Ability[];
  types: { type: { name: string } }[];
  stats: Stat[];
}

interface Props {
  pokemon: Pokemon;
}

const typeColor: { [key: string]: string } = {
  normal: "bg-[#aa9]",
  steel: "bg-[#aab]",
  fire: "bg-[#f42]",
  grass: "bg-[#7c5]",
  water: "bg-[#39f]",
  electric: "bg-[#fc3]",
  ice: "bg-[#6cf]",
  flying: "bg-[#89f]",
  fighting: "bg-[#b54]",
  poison: "bg-[#a59]",
  ground: "bg-[#db5]",
  psychic: "bg-[#f59]",
  bug: "bg-[#ab2]",
  rock: "bg-[#ba6]",
  ghost: "bg-[#66b]",
  dragon: "bg-[#76e]",
  dark: "bg-[#754]",
  fairy: "bg-[#e9e]",
};

const statAbbr: { [key: string]: string } = {
  hp: "hp",
  attack: "attack",
  defense: "defense",
  "special-attack": "s.atk",
  "special-defense": "s.def",
  speed: "speed",
};

const PokemonCard = ({ pokemon }: Props) => {
  const [data, setData] = useState<PokemonData | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon data");
        }
        const fetchedData: PokemonData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    fetchPokemonData();
  }, [pokemon.url]);

  const getPokemonId = (url: string): string | null => {
    const matchId = url.match(/\/(\d+)\/$/);
    return matchId ? matchId[1] : null;
  };

  const pokemonId = getPokemonId(pokemon.url);

  const formatPokemonId = (number: string): string => {
    return `${String(number).padStart(3, "0")}`;
  };

  const flipCard = async () => {
    setIsClicked(!isClicked);
    await controls.start({ rotateY: isClicked ? 0 : 180 });
  };

  return (
    <div className="flex items-center justify-center flex-col relative">
      <motion.div
        className="cursor-pointer"
        animate={controls}
        onClick={flipCard}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.1 }}
      >
        <motion.div
          className="bg-white flex items-center rounded-lg relative drop-shadow-md"
          initial={{ rotateY: 0 }}
          variants={{ front: { rotateY: 0 }, back: { rotateY: 180 } }}
          animate={isClicked ? "back" : "front"}
        >
          <div className="absolute top-0 left-0 font-bold px-2 py-1 text-2xl text-gray-200">
            N&deg;{formatPokemonId(pokemonId || "")}
          </div>
          <div className="flex absolute bottom-0 justify-center w-full">
            {data?.types &&
              data.types.map((type, index) => (
                <div
                  key={index}
                  className={`w-full text-center text-xs text-white capitalize first:rounded-bl-lg last:rounded-br-lg ${
                    typeColor[type.type.name]
                  }`}
                >
                  {type.type.name}
                </div>
              ))}
          </div>
          {!isClicked ? (
            <Image
              unoptimized
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
              alt={`${pokemon.name}`}
              width={180}
              height={180}
              className="z-10 p-2"
              priority={true}
            />
          ) : (
            <div className="w-[180px] h-[180px] flex flex-col items-center justify-center p-4 select-none">
              <div className="capitalize font-bold mt-2 text-center text-sm">
                {pokemon.name}
              </div>
              {data?.stats &&
                data.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs w-full"
                  >
                    <div className="capitalize">{statAbbr[stat.stat.name]}</div>
                    <div className="flex items-center">
                      <div className="pr-1">{stat.base_stat}</div>
                      <Progress
                        value={stat.base_stat}
                        max={150}
                        className="w-14 h-1"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PokemonCard;
