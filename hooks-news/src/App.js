// Use Hacker News API - for news articles

// refs -- gives way to access react elements created in render method, ex: if we created and attach a ref to input field we will have the ability to focus it

// for rapid styling -- use tailwindCss which is a cdn link

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

export default function App() {

  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get back a ref object called searchInputRef(any variable)
  // searchInputRef can now be used to input field for example by passing it to the ref property
  // this will allow the content of the input field to be accessible through our ref
  const searchInputRef = useRef()

  // reaching out to external API is a sideEffect
  // using async await, and then statement which is the traditional promise
  // async for effect function -- returns a promise implicitly
  useEffect(() => {
    //promise -- call external api using axios
    //runs after every render when state is set components re-rendered and useEffect will just go to inifite loop making request after request
    //adding the empty array as second arg will ensure that the contents of our effect function only run on component mounted and not on any updates
    //by resolving the infinite loop using [] we make one request on component mount
    // axios
    // .get("http://hn.algolia.com/api/v1/search?query=reacthooks")
    // .then(response => {
    //   console.log(response.data);
    //   setResults(response.data.hits); //sets a state
    // })

    //currently running on componentmount and unmount
    //if we want to run the getResults based on a certain value changing pass on the array args the dependency [query] for example
    // getResults will now be fired on component mount as well as whenever query state has been updated
    getResults()

    //to get results only when a search button is click remove [query] dependency
  }, [])

  // to resolve the error that async for effect must return anything which is used for clean up
  // create a separate async function outside useEffect and call the function in useEffect
  const getResults = async () => {
    //when starting app theres a split second empty page before fetching the data
    // to handle this we let user know that the page is loading 
    setLoading(true)

    // set up error handling -- in async use try catch
    try {
      const response = await axios
        .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      setResults(response.data.hits)
    } catch (err) {
      setError(err) //to test error try passing invalid url
    }
    //after getting results set loading to false
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault() // to prevent page from reloading
    getResults()
  }

  const handleClearSearch = () => {
    setQuery("");
    // current property of ref points to mounted text input element and access methods from it for example the value of input, focus etc..
    searchInputRef.current.focus()
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-50 shadow-lg rounded">
      <img src="https://pics.freeicons.io/uploads/icons/png/20167174151551942641-512.png" alt="React Logo" className="float-right h-12" />
      <h1 className="text-gray-900 font-thin mb-2">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input type="text" onChange={e => setQuery(e.target.value)} value={query} ref={searchInputRef} className="border p-1 rounded" />
        <button type="submit" className="bg-yellow-200 rounded m-1 p-1">Search</button>
        <button type="button" onClick={handleClearSearch} className="bg-green-400 rounded m-1 p-1 text-white rounded">Clear</button>
      </form>
      {loading ? (<div className="font-bold text-yellow-900"> Loading results ...</div>)
        : (<ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url} className="text-indigo-500 hover:text-indigo-900 ">{result.title}</a>
            </li>

          ))}
        </ul>
        )}
      {error && <div className="text-red-500 font-bold">{error.message}</div>}
    </div>
  )
}
