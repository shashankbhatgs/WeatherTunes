import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Weather from './Weather';


const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Weather code={code}/> : <Login />;
}

export default App;
