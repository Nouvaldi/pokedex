"use server";

export async function getAllPokemon() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=905&offset=0"
    );
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.log('Error fetching data:', error);
    return null;
  }
}
