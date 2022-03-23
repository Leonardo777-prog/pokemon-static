const toggleFavorite = (id: number) => {

    console.log('togglefavorite llamado');

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(id)) {
        favorites = favorites.filter((idFavorite) => idFavorite !== id)
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}


const existInFavorites = (id: number): boolean => {

    if (typeof window === 'undefined') return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id)
}

const pokemons = ():number[] => {
    
    return JSON.parse(localStorage.getItem('favorites') || '[]')

}

export default {
    toggleFavorite,
    existInFavorites,
    pokemons
}