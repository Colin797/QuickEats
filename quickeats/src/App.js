import logo from './logo.svg';
import './App.css';

function App() {

  var json = require('../recipes_raw_nosource_fn.json')

var length_in = [];
for (const [key, value] of Object.entries(json)) {
    //console.log(`${key}: ${value}`);
    //console.log(key)
    //console.log(value.ingredients.length)
    
    //for ar
    //length_in.push(value.ingredients.length-1)
    try {
        length_in.push(value.ingredients.length)
    } catch (error) {

    }
        
    
    //length_in.push(value.ingredients.length)
    
    //temp.push(key)
  }

  console.log(length_in)
console.log(Math.max(...length_in));
console.log(Math.min(...length_in));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
