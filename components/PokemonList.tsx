"use client";

import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllPokemon } from "@/app/actions/getAllPokemon";
import PokemonCard from "./PokemonCard";
import { Input } from "./ui/input";
import { PuffLoader } from "react-spinners";
import { Pokemon } from "./PokemonCard";
import { motion } from "framer-motion";
import { useDebounce } from "use-debounce";
import { ScrollToTopButton } from "./ScrollToTopButton";

const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextIndex, setNextIndex] = useState(60);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [value] = useDebounce(searchText, 750);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const loadInitialPokemon = async () => {
      setLoading(true);
      const initialPokemons = await getAllPokemon();
      setAllPokemons(initialPokemons);
      setPokemons(initialPokemons.slice(0, 60));
      setDisplayedPokemons(initialPokemons.slice(0, 60));
      await delay(3000);
      setLoading(false);
    };
    loadInitialPokemon();
  }, []);

  const loadMore = () => {
    const newIndex = nextIndex + 60;
    const newPokemons = allPokemons.slice(nextIndex, newIndex);
    setPokemons((prev) => [...prev, ...newPokemons]);
    setDisplayedPokemons((prev) => [...prev, ...newPokemons]);
    setNextIndex(newIndex);
    if (newIndex >= allPokemons.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const handleSearch = () => {
      if (value.toLowerCase()) {
        const filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase())
        );
        setDisplayedPokemons(filteredPokemons);
        setHasMore(false);
      } else {
        setDisplayedPokemons(pokemons);
        setHasMore(nextIndex < allPokemons.length);
      }
    };
    handleSearch();
  }, [allPokemons, nextIndex, pokemons, value]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PuffLoader loading={loading} size={200} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-col justify-center items-center pt-10 w-full"
    >
      <ScrollToTopButton />
      <Input
        type="text"
        autoComplete="off"
        placeholder="Search for a Pokemon"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-3/4 md:w-1/2 drop-shadow-md rounded-full p-6 transition-all ease-in-out"
      />
      <InfiniteScroll
        dataLength={pokemons.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="p-5 mb-10"
      >
        <motion.div
          initial={{ opacity: 0, translateY: 5 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5 p-5"
        >
          {displayedPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </motion.div>
      </InfiniteScroll>
    </motion.div>
  );
};

export default PokemonList;
