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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import VsmAR from './vsm1'


var list = []
var item = ""
var displayList = [];
var recipes = false;
function App() {

  const [query, setQuery] = useState("")
 
  const onChange = (e) => {
    
      setQuery(e.target.value)
      item = e.target.value
      //recipes = false
    
  }

  const onAdd = (e) => {
  	e.preventDefault();
    document.getElementById('outlined-basic').value = ''
    if (item != "") {
      list.push(item)
      item = ""
      console.log(list)
      setQuery("")
    }
  	
    displayList = []
    for (let i = 0; i < list.length; i++) {
        displayList.push(<div style={{ padding: '2px'}} key={i}>{list[i]}</div>)
    }

  }


  const onClear = (e) => {
    console.log("here")
    e.preventDefault();
    list = []
    displayList = []
    window.location.reload()
  }

  const onSearch = (e) => {
    e.preventDefault();
    recipes = true;
    console.log(recipes)
    onChange(e);
    //<VsmEPI query={list}/>
  }


  return (
    <div className="App">
      <header className="App-header">
      <h1>Quick Eats</h1>
        <img src={logo} className="App-logo" alt="logo" />
        	<div>
      		<TextField id="outlined-basic" disabled={recipes} label="Ingredient" variant="outlined" color="primary" onChange={onChange} size="small" style={{paddingTop:"4px"}}/>
      		<Button variant="contained" disabled={recipes} color="primary" size="large" style={{marginLeft:"6px"}} onClick={onAdd}>Add</Button>
      		<Button variant="contained" color="primary" size="large" style={{marginLeft:"6px"}} onClick={onClear}>Clear</Button>
          <Button variant="contained" disabled={recipes} color="primary" size="large" style={{marginLeft:"6px"}} onClick={onSearch}>Search Recipes</Button>
          </div>
        	<div>Ingredient List:</div>
        	<Typography component={'span'} style={{color:"black"}}>
        		{displayList}
        	</Typography>
 			    <div>Recipes:</div>
          <Typography component={'span'} style={{color:"black"}}>
            { console.log(recipes) }
            { recipes ? <VsmEPI query={list}/> : undefined }
            
          </Typography>
			
        	
      </header>
    </div>
  );
}

export default App;
