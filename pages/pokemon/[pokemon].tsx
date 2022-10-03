import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
type Props = {
  pokemon: any;
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

const getAbilityDetails = async (apiURL: string) => {
  const res = await fetch(apiURL);
  const ability = await res.json();
  return ability.effect_entries[0].effect;
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (context) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${context?.params?.pokemon}`
    );
    const pokemon = await res.json();

    return {
      props: {
        pokemon,
      },
    };
  }
  return {
    props: {
      pokemon: null,
    },
  };
};

function Pokemon({ pokemon }: Props) {
  useEffect(() => {});
  return (
    <>
      <Head>
        <title> Pokemon Browser | ${pokemon.name} </title>
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
                <h1 className="capitalize ">{pokemon.name}</h1>
                <p className="ml-2"># {pokemon.order}</p>
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
          <div className="w-1/2 bg-gray-200 py-10 px-5 rounded-xl text-neutral-800">
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
          <div className="w-1/2 bg-red-400 rounded-lg text-white py-10 px-5">
            <h2 className="text-2xl mb-2">Abilities</h2>
            <ul className="w-48">
              {pokemon.abilities.map((ability: any) => (
                <li
                  key={ability.ability.name}
                  className="flex flex-row justify-between w-full"
                >
                  <p className="capitalize">{ability.ability.name}</p>
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
