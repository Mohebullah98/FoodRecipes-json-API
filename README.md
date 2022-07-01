# Backend JSON API for food recipes
Using Nodejs and a json file with food recipes, I have created basic RESTful functionality for an API.

A single data entry would look like this:
```json
{
            "name": "garlicPasta",
            "ingredients": [
                "500mL water",
                "100g spaghetti",
                "25mL olive oil",
                "4 cloves garlic",
                "Salt"
            ],
            "instructions": [
                "Heat garlic in olive oil",
                "Boil water in pot",
                "Add pasta to boiling water",
                "Remove pasta from water and mix with garlic olive oil",
                "Salt to taste and enjoy"
            ]
        }
```

# Functionality

## Get all recipes
### GET:

```
http://localhost:3000/recipes
```
### Output:

```json
{
    "recipeNames": [
        "scrambledEggs",
        "garlicPasta",
        "chai",
        "butteredBagel"
    ]
}
```
An array with all recipe names.

## Get a single recipe from it's name
### GET:

```
http://localhost:3000/recipes/details/{itemName}
```
### Output:

```json
{
    "details": {
        "ingredients": [
            "1 tsp oil",
            "2 eggs",
            "salt"
        ],
        "numSteps": 5
    }
}
```
Ingredients and number of steps to prepare item.

## Create a new Recipe
### POST

```
http://localhost:3000/recipes
```
input: Recipe in json format
```json
{
"name": "butteredBagel",
            "ingredients": [
                "1 bagel",
                "butter"
            ],
            "instructions": [
                "cut the bagel",
                "spread butter on bagel"
            ]
        }
```
### Output:

```
created
```
Note: If the recipe already exists, you will get a message that states it already exists.

## Replace an existing Recipe
### PUT

```
http://localhost:3000/recipes
```
input: Recipe with updated body in json format

```json
{
"name": "butteredBagel",
            "ingredients": [
                "1 bagel",
                "butter",
                "cream cheese"
            ],
            "instructions": [
                "cut the bagel",
                "spread butter on bagel"
                "apply cream cheese"
            ]
        }
```
### Output:

204 Status with no response.

Note: If the recipe does not exist, you will get a message that states it doesn't exist.