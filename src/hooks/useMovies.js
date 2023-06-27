import React, { useMemo, useState } from 'react'
import { SearchMovies } from '../services/movies.js'

export function useMovies({query, sort}) {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusSearch = React.useRef(query)

    const getMovies =  useMemo(()=> {
      return async ({query}) => {

        if (query === previusSearch.current) return 
        try {
        
          setLoading(true)
          setError(null)
          previusSearch.current = query
          const newMovies = await SearchMovies({query})
          setMovies(newMovies)
    
        } catch (error) {
          console.log(error)
          setError(error)
        } finally { 
          setLoading(false)
        }
      }
    },[query])
    
   
    const moviessorted =  useMemo(()=>{
      return sort
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies 
      
    }, [movies, sort])

  return { movies : moviessorted, getMovies, loading, error }
}
