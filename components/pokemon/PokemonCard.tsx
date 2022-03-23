import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces';

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

    const router = useRouter();

    const { id, img, name, url } = pokemon

    const handleClick = () => {
        router.push(`/name/${name}`);
    }


    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card hoverable clickable onClick={handleClick}>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        loading='lazy'
                        src={img}
                        width={'100%'}
                        height={'140px'}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize'>{name}</Text>
                        <Text transform='capitalize'>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
