import type { NextPage } from "next";
import { GetStaticProps } from "next";

import Image from "next/image";
import Head from "next/head";

type Props = {
  pokemon: any;
};

interface Pokemon {
  name: string;
  url: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const pokemon = await res.json();
  const pokemonDetails = await Promise.all(
    pokemon.results.map(async (pokemon: Pokemon) => {
      const res = await fetch(pokemon.url);
      const pokemonDetail = await res.json();
      return pokemonDetail;
    })
  );

  //merge pokemon and pokemonWithDetails based on name
  const mergedPokemon = pokemon.results.map((pokemon: Pokemon) => {
    const pokemonWithDetail = pokemonDetails.find(
      (pokemonWithDetail: any) => pokemonWithDetail.name === pokemon.name
    );
    return {
      ...pokemon,
      details: pokemonWithDetail,
    };
  });

  return {
    props: {
      pokemon: mergedPokemon,
    },
  };
};

function Home({ pokemon }: Props) {
  console.log(pokemon);
  return (
    <>
      <Head>
        <title> Pokemon Browser | Home </title>
      </Head>
      <section>
        {pokemon && (
          <div className="grid grid-cols-3 gap-4">
            {pokemon.map((pokemon: any) => (
              <div
                className="bg-white rounded-lg shadow-lg p-4"
                key={pokemon.name}
              >
                <div className="flex justify-center">
                  <Image
                    src={pokemon.details.sprites.front_default}
                    width={96}
                    height={96}
                    alt={pokemon.name}
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-xl font-bold text-center capitalize">
                    {pokemon.details.name}
                  </h1>
                </div>
                <div className="flex flex-row gap-5 justify-center mt-4">
                  {pokemon.details.types.map((type: any) => (
                    <p
                      className={`text-lg text-white text-center capitalize rounded-full px-4 py-1  ${
                        type.type.name === "grass"
                          ? "bg-green-500"
                          : type.type.name === "fire"
                          ? "bg-red-500"
                          : type.type.name === "water"
                          ? "bg-blue-500"
                          : type.type.name === "bug"
                          ? "bg-green-700"
                          : type.type.name === "normal"
                          ? "bg-gray-400"
                          : type.type.name === "poison"
                          ? "bg-purple-500"
                          : type.type.name === "electric"
                          ? "bg-yellow-500"
                          : type.type.name === "ground"
                          ? "bg-yellow-700"
                          : type.type.name === "fairy"
                          ? "bg-pink-500"
                          : type.type.name === "fighting"
                          ? "bg-red-700"
                          : type.type.name === "psychic"
                          ? "bg-pink-700"
                          : type.type.name === "rock"
                          ? "bg-yellow-800"
                          : type.type.name === "ghost"
                          ? "bg-purple-700"
                          : type.type.name === "ice"
                          ? "bg-blue-200"
                          : type.type.name === "dragon"
                          ? "bg-purple-800"
                          : type.type.name === "dark"
                          ? "bg-gray-700"
                          : type.type.name === "steel"
                          ? "bg-gray-300"
                          : "bg-gray-500"
                      }`}
                      key={type.type.name}
                    >
                      {type.type.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
