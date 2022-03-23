import React, { FC } from 'react'
import { Grid } from '@nextui-org/react'
import { CardFavorite } from './'

interface Props {
    pokemonsIds: number[]
}

export const ListFavoritesPokemon: FC<Props> = ({ pokemonsIds }) => {
    return (
        <Grid.Container gap={2} direction={'row'} justify='center'>
            {pokemonsIds.map((id) => (
                <CardFavorite pokemonId={id} key={id} />
            ))}
        </Grid.Container>
    )
}
