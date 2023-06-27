export const SearchMovies = async ({query}) => {

    if (query === '') return null

    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_MOVIES_APIKEY}`)
        const json = await response.json()

        const movies = json.Search
  
        return movies?.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
        }))

    }catch (error) {
        throw new Error("error searching movies")
    }
}