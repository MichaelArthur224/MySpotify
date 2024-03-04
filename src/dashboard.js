import React from "react";
import './dashboard.css';
import "./app.css"
import "./sidebar.css"
import { useEffect, useState } from "react";
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from "./useAuth"

//DECLARE SPOTIFY API
const spotifyApi = new SpotifyWebApi({
    clientID: '97a1a89c45a34132a37aaa2397248ea4',
    clientSecret: '62d2fde6bd7e438dbcaea8ddcfe222c1',
});

export default function Dashboard({code}) {
  const accessToken = useAuth(code);
  const [artistsData, setArtistsData] = useState([]);
  const [tracksData, setTracksData] = useState([]);
  const [timeRange, setTimeRange] = useState('medium_term');
   
  useEffect(() => {
    if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

  useEffect(() => {
    if (!accessToken) return 

//TOP ARTISTS
    const fetchData = async () => {
      try {
          const res = await spotifyApi.getMyTopArtists({
              time_range: timeRange,
              limit: 20, 
          });

          const fetchedArtistsData = res.body.items.map(artist => ({
              name: artist.name,
              image: artist.images.length > 0 ? artist.images[0].url : null
          }));

          setArtistsData(fetchedArtistsData);
      } catch (error) {
          console.error('Error fetching top artists:', error);
      }
  };

  fetchData();

}, [spotifyApi, setArtistsData, accessToken, timeRange]);


//TOP SONGS
useEffect(() => {
  if (!accessToken || !spotifyApi) return;

  const fetchData = async () => {
      try {
          const res = await spotifyApi.getMyTopTracks({
            time_range: timeRange,
            limit: 20, 
          });

          const fetchedTracksData = res.body.items.map(track => ({
            artist: track.artists[0].name,
            title: track.name,
            albumUrl: track.album.images.length > 0 ? track.album.images[0].url : null,
          }));

          setTracksData(fetchedTracksData);
      } catch (error) {
          console.error('Error fetching top tracks:', error);
      }
  };

  fetchData();

}, [spotifyApi, setTracksData, accessToken, timeRange]);

//TIME RANGE
const handleSelectChange = (e) => {
  setTimeRange(e.target.value);
};

//HTML
   return <div className='main'>
     <section>
     <div className="main-bar">
            <div className="navbar">
                <li className="logo">My Spotify</li>
                <ul>
                    <li><a href='#artist'>Artists</a></li>
                    <li><a href='#tracks'>Songs</a></li>
                    <li><a href='#about'>About</a></li>
                </ul>
            </div>
        </div>
     </section>
      <section id='artist'>
        <div className='top'>
          <h1>Top 20 Artist</h1>
            <div className='select'>
              <select value={timeRange} onChange={handleSelectChange}>
              <option value="short_term">Last 4 Weeks</option>
              <option value="medium_term">Last 6 Months</option>
              <option value="long_term">Last 7 Years</option>
            </select>
          </div>
        <ul>
     {artistsData.map((artist, index) => (
        <li key={index}>
          {artist.image && <img src={artist.image} alt={artist.name} />}
            <p>{index + 1}. {artist.name}</p>
          </li>
        ))}
          </ul>
        </div>
      </section>
 
   <section id='tracks'>
    <div className='songs'>
      <h1>Top 20 Tracks</h1>
        <ul>
          {tracksData.map((track, index) => (
            <li key={index}>
              {track.albumUrl && <img src={track.albumUrl} alt={track.albumUrl} />}
              <p>{index + 1}. {track.title} - {track.artist} </p>
            </li>
          ))}
        </ul>
      </div>
   </section>
   <section id='about'>
    <div className='about'>
      <h1>About</h1>
        <p>Welcome to My Spotify, where your music experience meets personalized insights! Our application seamlessly integrates with the Spotify API, utilizing the power of React on the frontend and Node.js on the backend to provide you with a tailored showcase of your most listened to artists and tracks.</p>
      </div>
    </section>
   </div>
}


