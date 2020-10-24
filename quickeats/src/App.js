import logo from './logo.svg';
import './App.css';
import VsmEPI from './vsm'
//import VsmAR from './vsm1'

function App() {

  var list = ["red apple","green apple"]

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <VsmEPI query={list}/>
      </header>
    </div>
  );
}

export default App;
