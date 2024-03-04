import React from 'react'
import './login.css'


const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=YOUR_ID_HERE&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read%20user-read-email%20user-read-private%20user-library-read"

  export default function Login() {
    return (
      <div className='login'>
        <a
          className="button"
          href={AUTH_URL}>
          <p>LOGIN WITH SPOTIFY</p>
          </a>
      </div>
    );
  }
