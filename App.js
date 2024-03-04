import Login from './login.js';
import Dashboard from './dashboard.js'
import "./app.css"
import "./login.css"


const code = new URLSearchParams(window.location.search).get('code')
function App() {
  //code error in here
  return code ? <Dashboard code={code} /> : <Login />

}

export default App;
