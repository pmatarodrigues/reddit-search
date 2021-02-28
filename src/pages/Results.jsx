import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const SearchResult = props => {
  const { result } = props

  return(
    <a href={result.url} >
      <div  className="px-10 py-4 hover:bg-gray-100 hover:rounded-md hover:shadow-lg">
        <p className="text-green-600 text-xs mb-0">{result.displayed_url}</p>
        <h1 className="text-black text-base sm:text-lg">{result.title}</h1>
        <p className="text-gray-500 text-sm sm:text-sm">{result.snippet}</p>
      </div>
    </a>
  )
}

const Results = props => {
  const [resultsData, setResultsData] = useState([])
  let history = useHistory()
  let { location: {state} } = history

  useEffect(() => {
    // if state is undefined
    if(!state) {
      history.push("/")
    } else {
      setResultsData( state );
    }
  }, [])

  return(
    <div className="bg-white text-left rounded-md shadow-2xl my-20 w-full sm:w-3/4 transition ease-in-out">
      {resultsData.map((result, idx) => {
        return <SearchResult result={result} />
      })}
    </div>
  )
}

export default Results