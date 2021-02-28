import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import results from '../results.json'

import Loader from "react-loader-spinner";

const fetchResultsFromAPI = () => {

  return results.organic_results
}


const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [subreddit, setSubreddit] = useState("")
  const [recentSearches, setRecentSearches] = useState([])
  const [focusingSearch, setFocusingSearch] = useState(false)
  const [notification, setNotification] = useState("")
  const [isLoading, setLoading] = useState(false)

  const history = useHistory()

  const submitSearch = async (e) => {
    setLoading(true)
    e.preventDefault();
    const API_KEY = process.env.REACT_APP_API_KEY
    const url = "http://api.serpstack.com/search?"
    var query = `${url}access_key=${API_KEY}&query=${searchQuery} site:reddit.com${subreddit.length > 0 ? "/r/" + subreddit : ""}&num=20`
    setNotification("")
    await axios.get(query)
    .then(res => {
        setLoading(false)
      if(res.data.success === false) {
        setNotification(res.data.error.info)
      }
      else {
        history.push('/results', res.data.organic_results)
      }
    })
    .catch(error => {
      setLoading(false)
      if (error.response) {
        // Request made and server responded
        setNotification("Error getting response from server")
      } else if (error.request) {
        // The request was made but no response was received
        setNotification("No response received from server")
      } else {
        // Something happened in setting up the request that triggered an Error
        setNotification(error.message)
      }
    })
  }

  return(
    <>
    <div className="bg-white rounded-md p-5 w-3/4 md:w-2/5 shadow-2xl my-20">
      <form onSubmit={submitSearch}>
        <div className={`flex text-base justify-left align-center text-left ${focusingSearch ? "pb-4" : ""}`}>
          {/* <label className="text-sm">Subreddit</label>
          <input className="bg-white px-4 py-2 shadow-lg mb-5 w-3/4 text-sm" placeholder="Any" type="text" /> */}
          <input
            className="flex-1 bg-white px-4 py-2 text-md text-black"
            placeholder="Search"
            value={searchQuery}
            onFocus={() => setFocusingSearch(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text" />
          {!isLoading ? (
            <button>
              <img src="search.png" className="w-6 h-6 opacity-30" />
            </button>) : (
              <Loader
                type="ThreeDots"
                color="black"
                height={30}
                width={30}
                timeout={5000} //3 secs
                />
            ) }
        </div>
        <div className={`transition duration-700 ease-in-out transform  ${!focusingSearch ? "h-0 overflow-hidden" : "h-full"}`}>
          <div className="flex flex-col justify-left align-center text-left w-full border-t-2 pt-5">
            <label className="text-sm text-gray-300">Subreddit (leave blank if none)</label>
            <div className="flex">
              <p className="text-green-400">
                r/
              </p>
              <input
                className="flex-1 bg-transparent border-green-400 border-b-2 px-2 mb-5 w-max text-sm text-green-400"
                placeholder=""
                value={subreddit}
                onSelect={() => {
                  if(subreddit.length === 0) setSubreddit("")
                }}
                onChange={(e) => setSubreddit(e.target.value)}
                type="text" />
            </div>
          </div>
        </div>
      </form>
    </div>
    { notification.length > 2 && <h2 className="mt-5 text-xs ">! {notification}</h2> }
    </>
  )
}

export default Search