const express =require("express");
const port=3000;
const app= express();
const data = require("./data.json");
const fs = require("fs");

app.use(express.urlencoded({
  extended:true
}));

app.use(express.json())

app.get("/recipes",((req,res)=>{
    let recipeNames = data.recipes.reduce((acc,rec)=>{
        acc.push(rec.name);
        return acc;
},[])
res.json({
    recipeNames: recipeNames
})
}))
app.get("/recipes/details/:item",((req,res)=>{
const item = req.params.item;
const foodDetails = data.recipes.find((food)=>food.name === item);
if(foodDetails === undefined){ //recipe does not exist
    res.json({});
    return false;
}
res.json({
    details: 
    {
        ingredients: foodDetails.ingredients,
        numSteps: foodDetails.instructions.length
    }
})
return true;
}))
app.post("/recipes",((req,res)=>{
    const foodItem = req.body;
    const foodDetails =data.recipes.find((food)=>food.name === foodItem.name);
    if (foodDetails!==undefined){
        res.json({
            error:"Recipe already exists"
        })
        res.sendStatus(400);
        return;
    }
    fs.readFile('data.json', 'utf8', function readFileCallback(err, dat){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(dat); //now it an object
        obj.recipes.push(foodItem); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('data.json', json, 'utf8', ()=>res.sendStatus(201)); // write it back 
    }});

}))
app.put("/recipes",((req,res) =>{
    const foodItem = req.body;
    const foodDetails =data.recipes.find((food)=>food.name === foodItem.name);
    if (foodDetails===undefined){
        res.json({
            error:"Recipe Does not exists"
        })
        res.sendStatus(404);
        return;
    }
    fs.readFile('data.json', 'utf8', function readFileCallback(err, dat){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(dat); //now it an object
        obj.recipes.forEach((recipe,i)=>{if(recipe.name== foodItem.name) obj.recipes[i] = foodItem});
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('data.json', json, 'utf8', ()=>res.sendStatus(204)); // write it back 
    }});
    
}))
app.listen(port,function(req,res){
  console.log("Server has started on port 3000");
})
