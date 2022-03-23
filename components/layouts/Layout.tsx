import { FC } from 'react'
import Head from 'next/head'
import { NavBar } from '../ui';
import { useRouter } from 'next/router';

interface Props {
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name='author' content='Leonardo Cano' />
                <meta name='description' content={`Informacion de un pokemon ${title}`} />
                <meta name='keywords' content='xxxx, pokemon, pokedex' />
                <meta property="og:title" content={`Infomacion sobre el pokemon`} />
                <meta property="og:description" content={`Esta es la pagina de`} />
                <meta property="og:image" content={`${origin}/images/banner.png`} />
            </Head>

            <NavBar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
