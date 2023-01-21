import React, { useState } from 'react'
import axios from 'axios'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'; 
// import Player from './Player';

export default function Weather({code}) {
    const spotifyApi = new SpotifyWebApi()

  const accessToken = useAuth(code); 
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [tracks, setTracks] = useState([]);
  const [bodyResponse, setBodyResponse] = useState([]); 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3c64affc5d4f32a3ac29ef16aca8a90b`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        getPlaylist(response.data.weather[0].main)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const getPlaylist = async (description) => {
    spotifyApi.setAccessToken(accessToken)
    try {
      let playlistId = ''
      if (description === 'Thunderstorm') {
        playlistId = '37i9dQZF1DXdipfKDeMPTE?si=f6c4b0ddc8bb4a82'
      } else if (description === 'Drizzle') {
        playlistId = '37i9dQZF1DWW0OFelDHUJP?si=e7336711100b4f79'
      } else if (description === 'Rain') {
        playlistId = '37i9dQZF1DXdLK5wjKyhVm?si=49745c44eed9406f'
      } else if (description === 'Snow') {
        playlistId = '7KA9b1CRD8bLmnfog2DULu?si=7028861de9724fa8'
      } else if (description === 'Atmosphere') {
        playlistId = '37i9dQZF1DX79Y9Kr2M2tM?si=109811ae896d4cdd'
      } else if (description === 'Clear') {
        playlistId = '7ztI3MesCO3UaTBuUbq0wE?si=1989ddb3099b4515'
      } else if (description === 'Clouds') {
        playlistId = '4WNtRob27nSAibrzc5eit3?si=ddfc927597854f35'
      } else if (description === 'Haze') {
        playlistId = '1UOVxzWPLAh1JLtTRtDS2f?si=6b32fff4e40242ab'
      } else if (description === 'Mist') {
        playlistId = '00EDda2Q81dERUPFPGHTIV?si=269b53b353f84272'
      } else if (description === 'Smoke') {
        playlistId = '1TDmkxsz242euZtUqfroq1?si=d0525bad2ae54a74'
      } else if (description === 'Dust') {
        playlistId = '7l0htEaV9n2KhDiIMfYoZX?si=70e85ac202a74ae2'
      } else if (description === 'Fog') {
        playlistId = '6GnpVInWlEUul5ZmIUgqCv?si=8ef7eb02cb904b2c'
      } else if (description === 'Sand') {
        playlistId = '3kUQ2eMQ0VNlgYv8zbGMQT?si=941a121ed2544968'
      } else if (description === 'Ash') {
        playlistId = '37i9dQZF1EIWs2Q9Xzk3qS?si=99c78d6f903349db'
      } else if (description === 'Squall') {
        playlistId = '37i9dQZF1EIVNX3XbvPimn?si=3fc10dceb1494da8'
      } else if (description === 'Tornado') {
        playlistId = '2os1hugm9AYSd2MSs3GjUe?si=97b6bf25d12446e8'
      } else {
        playlistId = '37i9dQZEVXbLZ52XmnySJg?si=6e48f8d2377947ca'
      }
      const response = await spotifyApi.getPlaylistTracks(playlistId)
      console.log(response);

      setTracks(response.body.tracks.items);
      setBodyResponse(response.body);
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

        {tracks.length > 0 && (
        <div className='bottom'>
            <h2>Playlist</h2>
            {/* <ul>
                {tracks.map((track, index) => (
                    <li key={index}>
                        <p>{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                        <a href={track.track.external_urls.spotify}>Play on Spotify</a>
                    </li>
                ))}
            </ul> */}
            <h3></h3>
            <a href={bodyResponse.external_urls.spotify}><b>Play on Spotify</b></a>
        </div>
      )}
      
      </div>
      

    </div>
  );
}

