//import logo from './logo.svg';
//import './App.css';

import React from "react";

function Vsm(props) {
  var json = require('./data/recipes_raw_nosource_epi.json')
  var json1 = require('./data/recipes_raw_nosource_ar.json')

  var userQuery = ["onions","pepper","butter"]
  var scoreMap = new Map()
  var timeMap = new Map()
  var instructions
  var ingredients


  for (const [key, value] of Object.entries(json)) {
    let score = 0
      //for ar
      //length_in.push(value.ingredients.length-1)
    try {
          for(let i = 0; i < userQuery.length; i++){
            for(let j = 0; j < value.ingredients.length; j++){
              if(value.ingredients[j].includes(userQuery[i])){ //modifty to only look for userQuery
                score += 1
                break 
              }
            }
          }

          instructions = value.instructions

          var temp = instructions.replaceAll("."," ")
            temp = temp.replaceAll(","," ")
            temp = temp.replaceAll("!"," ")
            temp = temp.replaceAll("?"," ")  
            temp = temp.replaceAll("-"," ")  
            temp = temp.split(" ")
            var time = 0

            for (let i = 0; i < temp.length; i++) {
              if (temp[i] == "minutes" ) {
                time += parseInt(temp[i-1])
              }
              else if (temp[i] == "hour") {
                if (temp[i-1][1] == "/") {
                  time += (eval(temp[i-1]) * 60)
                } else {
                  time += 60
                }
              }
              else if (temp[i] == "hours") {
                if (temp[i-1][1] == "/") {
                  time += (eval(temp[i-1])) * 60
                  if (!isNaN(temp[i-2])) {
                    time += (eval(temp[i-2])) * 60
                  }
                } 
                else {
                  time += (eval(temp[i-1])) * 60
                }
              }
            }

            score -= ( value.ingredients.length - score ) * .5

            if ( time != 0 && !isNaN(time) ) {
              score += (eval(1/time))
              scoreMap.set(key,score)
              timeMap.set(key,time)
            }
    } catch (error) {
    }
  }


for (const [key, value] of Object.entries(json1)) {
    let score = 0
      //for ar
      //length_in.push(value.ingredients.length-1)
    try {
          for(let i = 0; i < userQuery.length; i++){
            for(let j = 0; j < value.ingredients.length; j++){
              if(value.ingredients[j].includes(userQuery[i])){ //modifty to only look for userQuery
                score += 1
                break 
              }
            }
          }

          instructions = value.instructions

          var temp = instructions.replaceAll("."," ")
            temp = temp.replaceAll(","," ")
            temp = temp.replaceAll("!"," ")
            temp = temp.replaceAll("?"," ")  
            temp = temp.replaceAll("-"," ")  
            temp = temp.split(" ")
            var time = 0

            for (let i = 0; i < temp.length; i++) {
              if (temp[i] == "minutes" ) {
                time += parseInt(temp[i-1])
              }
              else if (temp[i] == "hour") {
                if (temp[i-1][1] == "/") {
                  time += (eval(temp[i-1]) * 60)
                } else {
                  time += 60
                }
              }
              else if (temp[i] == "hours") {
                if (temp[i-1][1] == "/") {
                  time += (eval(temp[i-1])) * 60
                  if (!isNaN(temp[i-2])) {
                    time += (eval(temp[i-2])) * 60
                  }
                } 
                else {
                  time += (eval(temp[i-1])) * 60
                }
              }
            }

            score -= ( value.ingredients.length - score ) * .5

            if ( time != 0 && !isNaN(time) ) {
              score += (eval(1/time))
              scoreMap.set(key,score)
              timeMap.set(key,time)
            }
    } catch (error) {
    }
  }

  var keyList = []
  var scoreList = []
  var timeList = []
  var titleList = []
  var x
  for (let i = 0; i < 10; i++) {
    x = ([...scoreMap.entries()].reduce((a, e ) => e[1] > a[1] ? e : a))
    var time = timeMap.get(x[0])

    try {
      titleList.push(json[x[0]].title)
    } catch (error) {}
    try {
      titleList.push(json1[x[0]].title)
    } catch (error) {}


    keyList.push(x[0])
    scoreList.push(x[1])
    timeList.push(time)

    scoreMap.delete(x[0])
  }

  


  return (
    <div> 
      <div> Rank 1 </div>
      <div> Recipe Title: {titleList[0]} </div>
      <div> key: {keyList[0]} </div>
      <div> score: {scoreList[0]} </div>
      <div> time in minutes: {timeList[0]} </div>
      <div> Rank 2 </div>
      <div> Recipe Title: {titleList[1]} </div>
      <div> key: {keyList[1]} </div>
      <div> score: {scoreList[1]} </div>
      <div> time in minutes: {timeList[1]} </div>
      <div> Rank 3 </div>
      <div> Recipe Title: {titleList[2]} </div>
      <div> key: {keyList[2]} </div>
      <div> score: {scoreList[2]} </div>
      <div> time in minutes: {timeList[2]} </div>
    </div>
    //<div> {props.query} </div>
  );
}

export default Vsm;