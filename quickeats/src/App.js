import React, { useState } from 'react';
import logo from './logo1.png';
import './App.css';
import VsmEPI from './vsm'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import VsmAR from './vsm1'


var list = ["salmon","tomato","lemon","garlic","butter"]
var item = ""
function App() {

  const [query, setQuery] = useState("")
 
  const onChange = (e) => {
  	setQuery(e.target.value)
  	item = e.target.value
  }

  const onSubmit = (e) => {
  	e.preventDefault();
  	list.push(item)
  	item = ""
  	console.log(list)
  	setQuery("")
  }

  const handleSearch = (): JSX.Element => {

  	return (
  		<VsmEPI query={list}/>  	
  	)
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1>Quick Eats</h1>
        <img src={logo} className="App-logo" alt="logo" />
        	<form className="search-form" onSubmit={onSubmit}>
        		<TextField id="outlined-basic" label="Ingredient" variant="outlined" color="primary" size="small" style={{paddingTop:"4px"}}/>
        		<Button variant="contained" color="primary" size="large" style={{marginLeft:"6px"}}>Add</Button>
        		<Button variant="contained" color="primary" size="large" style={{marginLeft:"6px"}}>Clear</Button>
        		<Button variant="contained" color="primary" size="large" style={{marginLeft:"6px"}}>Search Recipes</Button>
        	</form>
        	<div>Ingredient List:</div>
        	<Typography style={{color:"black"}}>
        		<ul>
				  <li>{list[0]}</li>
				  <li>{list[1]}</li>
				  <li>{list[2]}</li>
				  <li>{list[3]}</li>
				  <li>{list[4]}</li>
				</ul>
        	</Typography>
 			<VsmEPI query={list}/>
			
        	
      </header>
    </div>
  );
}

export default App;
