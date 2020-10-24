//import logo from './logo.svg';
//import './App.css';

import React from "react";

function Vsm() {
  var json = require('./data/recipes_raw_nosource_fn.json')

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

  //console.log(length_in)
//console.log(Math.max(...length_in));
//console.log(Math.min(...length_in));

  return (
    <div> {Math.min(...length_in)} </div>
  );
}

export default Vsm;