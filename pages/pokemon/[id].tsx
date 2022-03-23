import React, { useState } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Layout } from '../../components/layouts';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confeti from 'canvas-confetti';

import { getPokemonInfo, localFavorite } from '../../utils';

interface Props {
	pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

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

export default PokemonPage;


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	// const { data } = await  // your fetch function here 

	const pokemon151: string[] = [...Array(151)].map((value, index) => `${index + 1}`)



	return {
		// estos paths son las cantidad de paginas que va agenerar
		// paths: [
		// 	{
		// 		params: { id: '1' }
		// 	},
		// 	{
		// 		params: {
		// 			id: '1'
		// 		}
		// 	},
		// 	{
		// 		params: {
		// 			id: '1'
		// 		}
		// 	}
		// ],
		paths: pokemon151.map((id) => ({ params: { id } })),
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const { id } = params as { id: string }

	return {
		props: {
			pokemon: await getPokemonInfo(id)
		}
	}

}


