import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
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
  return <div>{pokemon.name}</div>;
}
export default Pokemon;
