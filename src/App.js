import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Farm from './Farm';

function App() {
  axios.get('http://localhost:8000/animals/').then(res => console.log(res.data))
  return (
    <div className="App">
      <header className="App-header">
        <Farm />
      </header>
    </div>
  );
}

export default App;
