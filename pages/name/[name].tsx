import React, { FC, useState } from 'react'
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { getPokemonInfo, localFavorite } from '../../utils'
import confeti from 'canvas-confetti'
import { pokeApi } from '../../api'
interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(localFavorite.existInFavorites(pokemon.id))

    const onToggleFavorite = () => {
        localFavorite.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if (isInFavorites) return

        confeti({
            zIndex: 999,
            particleCount: 250,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }



    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4} >
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image'}
                                alt={pokemon.name}
                                width={'100%'}
                                height={'200px'}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button ghost={!isInFavorites} color='gradient' onClick={onToggleFavorite}>
                                {isInFavorites ? 'En favoritos' : 'Añadir a favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprotes:</Text>
                            <Container direction='row' display='flex'>
                                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    return {
        paths: data.results.map((pokemon) => ({ params: { name: pokemon.name } })),
        fallback: false
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }



    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}
export default PokemonByNamePage