import type { PokemonAbilities } from "types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
type Props = {
  pokemon: any;
  abilities: any[];
};

interface Pokemon {
  name: string;
  url: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const pokemons = await res.json();

  const paths = pokemons.results.map((pokemon: Pokemon) => ({
    params: { pokemon: pokemon.name },
  }));

  return { paths, fallback: false };
};

const getAbilityDetails = async (apiURL: string): Promise<PokemonAbilities> => {
  const res = await fetch(apiURL);
  return await res.json();
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (context) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${context?.params?.pokemon}`
    );
    const pokemon = await res.json();

    let abilities: PokemonAbilities[] = await Promise.all(
      pokemon.abilities.map((ability: any) => {
        return getAbilityDetails(ability.ability.url);
      })
    );

    abilities = abilities.map((ability: PokemonAbilities) => {
      ability.effect_entries = ability.effect_entries.filter(
        (effect: any) => effect.language.name === "en"
      );
      return ability;
    });

    return {
      props: {
        pokemon,
        abilities,
      },
    };
  }
  return {
    props: {
      pokemon: null,
      abilities: null,
    },
  };
};

function Pokemon({ pokemon, abilities }: Props) {
  console.log(abilities, "abilities");
  return (
    <>
      <Head>
        <title> Pokemon Browser | {pokemon.name} </title>
      </Head>

      <section>
        <div className="flex justify-center">
          <header className="flex w-full bg-indigo-500 p-5 rounded-xl text-white items-center justify-center shadow-md">
            <div className="flex flex-row w-fit gap-5 items-center">
              <Image
                src={pokemon.sprites.back_default}
                width={96}
                height={100}
                alt={pokemon.name}
              />
              <div className="flex flex-row items-center">
                <h1 className="capitalize text-white">{pokemon.name}</h1>
                <p className="ml-2 text-white"># {pokemon.order}</p>
              </div>
              <Image
                src={pokemon.sprites.front_default}
                width={96}
                height={100}
                alt={pokemon.name}
              />
            </div>
          </header>
        </div>

        <div className="flex flex-row mt-10 gap-5">
          <div className="w-1/2 bg-gray-200 py-10 px-5 rounded-xl">
            <h2 className="text-2xl mb-2">Stats</h2>
            <ul className="w-48">
              {pokemon.stats.map((stat: any) => (
                <li
                  key={stat.stat.name}
                  className="flex flex-col md:flex-row mb-3 md:mb-2 justify-between w-full"
                >
                  <p className="capitalize">{stat.stat.name}</p>
                  <p>{stat.base_stat}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 bg-red-400 rounded-lg  py-10 px-5">
            <h2 className="text-2xl mb-2 text-white">Abilities</h2>
            <ul className="w-full">
              {abilities.map((ability: any) => (
                <li
                  key={ability.name}
                  className="flex flex-col justify-between w-full mb-5"
                >
                  <p className="text-white capitalize text-2xl font-semibold mb-2">
                    {ability.name}
                  </p>
                  <p className="text-white">
                    {ability.effect_entries[0].effect}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
export default Pokemon;
