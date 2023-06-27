function ListOfMovies({movies}) {
    return(
        <ul className="movies">
            {
            movies.map( movie => (
                <li key={movie.id} className="movie">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.title}/>
                </li>
            ))
            }
        </ul>
    )
}

function NoMovieresults() {
    return(
        <p>No se encontraron resultados para esta búsqueda</p>
    )
}

export function Movies({movies}){

    const hasMovies = movies?.length > 0
    return(
        
            hasMovies 
              ?
              <ListOfMovies movies={movies}/>
              : <NoMovieresults/>
    )
    
}