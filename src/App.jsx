import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies'
import debounce from "just-debounce-it"

const useSearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=>{

    console.log(query === '')
    
    if(isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }

    if(query === '')  {
      setError('No se puede realizar una busqueda vacia')
      return
    }

    if(query.match(/^[0-9]+$/)) {
      setError('No se puede realizar una busqueda con numeros')
      return
    }

    if(query.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)

  }, [query])

  return {query, setQuery, error}

}

function App() {
  const {query, setQuery, error} = useSearch()
  const [sort, setSort] = useState(false)
  const {movies, getMovies} = useMovies({query, sort})


  const searchDebounce = useCallback(
    debounce( search => {
      console.log("searach:", search)
      getMovies({query: search})
  
    }, 300)
    ,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({query})

    // searchDebounce(query )



    // const inputEl = inputRef.current
    // const value = inputEl.value

    // console.log(value)

    // const fields = Object.fromEntries( new window.FormData(event.target) )
    // console.log(fields)
  }

  const handleCheckbox = (event) => {
    setSort(event.target.checked)

  }

  const handleChange = (event) => {
  
    const newQuery = event.target.value
    setQuery(newQuery)
    // getMovies({query: newQuery})
    searchDebounce(newQuery)
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de Peliculas</h1>

            <form className='form' onSubmit={handleSubmit}>
              <input value={query} onChange={handleChange} name="query" placeholder='Avegers, Star Wars, The Matrix...'/>
              <input type='checkbox' name='sort' checked={sort} onChange={handleCheckbox}/>
              <button type='submit'>Buscar</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </header>
        <main>
          <Movies movies={movies}/>
          
        </main>
      </div>
  
    </>
  )
}

export default App
