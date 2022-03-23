import { Card, Grid } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { ListFavoritesPokemon } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorite } from '../../utils';

const FavoritePage = () => {

    const [pokemons, setPokemons] = useState<number[]>([])

    useEffect(() => {
        setPokemons(localFavorite.pokemons())
    }, [])

    return (
        <Layout title='Pokemons - Favoritos'>
            {
                pokemons.length === 0
                    ? (<NoFavorites />)
                    : (<ListFavoritesPokemon pokemonsIds={pokemons} />)
            }

        </Layout>
    )
}

export default FavoritePage