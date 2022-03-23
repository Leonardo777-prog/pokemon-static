import type { NextPage, GetStaticProps } from 'next'
import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse } from '../interfaces';
import { SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';


interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
    </Layout >
  )
}

export default HomePage

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

// es una funcion que se ejecuta del lado del servidor, nada de lo que se ponga qui llega al cliente exepo las props
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((pokemon) => {
    const id = pokemon.url.split('/')[6]
    pokemon.id = id;

    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

    return pokemon;
  })

  return {
    props: {
      pokemons
    }
  }
}

