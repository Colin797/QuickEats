//import logo from './logo.svg';
//import './App.css';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import React from "react";

function match(a,b){
  if(b.includes(" ")){
    return a.includes(b)
  }
  else{
    var wordsInIngredients = a.split(" ");
    for(let i = 0; i < wordsInIngredients.length; i++){
     if(wordsInIngredients[i] == b){
      return true;
     }
    }
    return false;
  }
  
}

function dupRemover(instr){
  instr = instr.replace(/\n/g, " ")
  var words = instr.split(" ")
  console.log(words)
  var dupStart = -1
  var duplicates = false
  for(let i = 6; i < words.length; i++){
    if(words[i] === words[1]){
      if((i + 5) < words.length){
        let count = 2
        for(let j = i+1; j < i + 5; j++){
          if(words[j] != words[count]){
            break
          }
          count += 1
        }
        if(count === 6){
          dupStart = i - 1
          duplicates = true
        }
      }
    }
  }
  
  //rebuild instruction string without duplicates
  if(duplicates === false){
    return instr
  }
  else{
    var noDup = ""
    for(let i = 0; i < dupStart-1; i++){
     noDup = noDup + words[i] + " "
    }
    noDup = noDup + words[dupStart-1]
    return noDup
  }
  
  
}

function Vsm(props) {
  //console.log(dupRemover("this is a duplicate string remover test. this is a duplicate string remover test"))
  var json = require('./data/recipes_raw_nosource_epi.json')
  var json1 = require('./data/recipes_raw_nosource_ar.json')

  //var userQuery = props.query;
  var userQuery = props.query;
  console.log("vsm")
  //var userQuery = ["chicken"]
  //var userQuery = ["onions","pepper","butter"]
  //var userQuery = ["chicken","mustard","pepper","onions","potato"]
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
              if(match(value.ingredients[j], userQuery[i])){ 
                score += 1
                break 
              }
            }
          }
          if(score == 0){
            continue
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
    } catch (error) {}    
  }

  /*for (const [key, value] of Object.entries(json1)) {
    let score = 0
      //for ar
      //length_in.push(value.ingredients.length-1)
    try {
          for(let i = 0; i < userQuery.length; i++){
            for(let j = 0; j < value.ingredients.length; j++){
              if(match(value.ingredients[j], userQuery[i])){ 
                score += 1
                break 
              }
            }
          }
          if(score == 0){
            continue
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
    } catch (error) {}    
  }*/


  var keyList = []
  var scoreList = []
  var timeList = []
  var titleList = []
  var ingredientsList = [];
  var instructionsList= []

  var x
  var numResults = scoreMap.size

  for (let i = 0; i < numResults; i++) {
    x = ([...scoreMap.entries()].reduce((a, e ) => e[1] > a[1] ? e : a))
    var time = timeMap.get(x[0])

    try {
      const tagsIds = [];
      for (let i = 0; i < json[x[0]].ingredients.length; i++) {
        const temp = json[x[0]].ingredients[i].toString()
        tagsIds.push(<div style={{ padding: '2px' }} key={i}> {temp} </div>)
      }
      ingredientsList.push(tagsIds)
      instructionsList.push(json[x[0]].instructions)
      titleList.push(json[x[0]].title)
    } catch (error) {}
    try {
      const tagsIds = [];
      for (let i = 0; i < json1[x[0]].ingredients.length; i++) {
        const temp = json1[x[0]].ingredients[i].toString()
        tagsIds.push(<div style={{ padding: '2px' }} key={i}> {temp} </div>)
      }
      ingredientsList.push(tagsIds)
      instructionsList.push(json1[x[0]].instructions)
      titleList.push(json1[x[0]].title)
    } catch (error) {}


    keyList.push(x[0])
    scoreList.push(x[1])
    timeList.push(time)

    scoreMap.delete(x[0])
  }
  console.log(dupRemover(instructionsList[2]))
  if(numResults == 0){
    return (
      <Typography style={{color:"black", margin:"50px"}}>
      <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
        <div style={{fontSize:"20px", paddingLeft:"10px", paddingRight:"10px"}}> Sorry, we did not find any recipes that include any of your ingredients. Please try again with different ingredients. </div>
      </Card>
      
      </Typography>
      );
  }
  else if(numResults == 1){
    instructionsList[0] = dupRemover(instructionsList[0])
    return (
      <Typography style={{color:"black", margin:"50px"}}>
        <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
          <h1 style={{fontSize:"25px"}}> Recipe Title: {titleList[0]} </h1>
          <div style={{paddingBottom:"10px"}}> <h2>Ingredients:</h2> { ingredientsList[0] }  </div>
          <div style={{paddingBottom:"10px"}}> <h2>Estimated Time to Prepare:</h2> {timeList[0]} minutes</div>
          <div style={{paddingBottom:"10px"}}> <h2>Instructions:</h2> {instructionsList[0]}</div>
        </Card>
      </Typography>
      );
  }
  else if(numResults == 2){
    instructionsList[0] = dupRemover(instructionsList[0])
    instructionsList[1] = dupRemover(instructionsList[1])
    return (
      <Typography style={{color:"black", margin:"50px"}}>
        <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
          <h1 style={{fontSize:"25px"}}> Recipe Title: {titleList[0]} </h1>
          <div style={{paddingBottom:"10px"}}> <h2>Ingredients:</h2> { ingredientsList[0] }  </div>
          <div style={{paddingBottom:"10px"}}> <h2>Estimated Time to Prepare:</h2> {timeList[0]} minutes</div>
          <div style={{paddingBottom:"10px"}}> <h2>Instructions:</h2> {instructionsList[0]}</div>
        </Card>
      
        <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
          <h1 style={{fontSize:"25px"}}> Recipe Title: {titleList[1]} </h1>
          <div style={{paddingBottom:"10px"}}> <h2>Ingredients:</h2> {ingredientsList[1]} </div>
          <div style={{paddingBottom:"10px"}}> <h2>Estimated Time to Prepare:</h2> {timeList[1]} minutes</div>
          <div style={{paddingBottom:"10px"}}> <h2>Instructions:</h2> {instructionsList[1]}</div>
        </Card>
      </Typography>
      );
  }
  else{
    instructionsList[0] = dupRemover(instructionsList[0])
    instructionsList[1] = dupRemover(instructionsList[1])
    instructionsList[2] = dupRemover(instructionsList[2])
    return (
    <Typography style={{color:"black", margin:"50px"}}>
      <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
        <h1 style={{fontSize:"25px"}}> Recipe Title: {titleList[0]} </h1>
        <div style={{paddingBottom:"10px"}}> <h2>Ingredients:</h2> { ingredientsList[0] }  </div>
        <div style={{paddingBottom:"10px"}}> <h2>Time to Prepare:</h2> {timeList[0]} minutes</div>
        <div style={{paddingBottom:"10px"}}> <h2>Instructions:</h2> {instructionsList[0]}</div>
      </Card>
      
      <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
        <h1 style={{fontSize:"25px"}}> Recipe Title: {titleList[1]} </h1>
        <div style={{paddingBottom:"10px"}}> <h2>Ingredients:</h2> {ingredientsList[1]} </div>
        <div style={{paddingBottom:"10px"}}> <h2>Time to Prepare:</h2> {timeList[1]} minutes</div>
        <div style={{paddingBottom:"10px"}}> <h2>Instructions:</h2> {instructionsList[1]}</div>
      </Card>

      <Card style={{backgroundColor:"#3f51b5", color:"#fff", marginBottom:"20px"}}> 
        <h1 style={{fontSize:"25px"}}> Recipe Title: {titleList[2]} </h1>
        <div style={{paddingBottom:"10px"}}> <h2>Ingredients:</h2> {ingredientsList[2]} </div>
        <div style={{paddingBottom:"10px"}}> <h2>Time to Prepare:</h2> {timeList[2]} minutes</div>
        <div style={{paddingBottom:"10px"}}> <h2>Instructions:</h2> {instructionsList[2]}</div>
      </Card>
      </Typography>
    
  );
 }
  
}

export default Vsm;