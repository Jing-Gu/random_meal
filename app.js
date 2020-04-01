const mealName = document.querySelector(".meal-name");
const mealCat = document.querySelector(".meal-category");
const mealArea = document.querySelector(".meal-area");
const mealTag = document.querySelector(".meal-tag");
const mealImage = document.querySelector(".meal-image");
const ingredientsList = document.querySelector(".ingredients-list");
const instruction = document.querySelector(".instructions");

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(response => response.json())
  .then(data => {
    console.log(data.meals[0]);
    let meal = data.meals[0];

    mealName.innerHTML = `<h1>${meal.strMeal}</h1>`;
    mealArea.innerHTML = `<p><b>Area:</b> ${meal.strArea}</p>`;
    mealCat.innerHTML = `<p><b>Category:</b> ${meal.strCategory}</p>`;

    if (meal.strTags) {
      mealTag.innerHTML = `<p><b>Tags:</b> ${meal.strTags
        .split(",")
        .join(", ")}</p>`;
    } else {
      mealTag.innerHTML = "";
    }

    mealImage.innerHTML = `<img src="${meal.strMealThumb}" alt="meal image" width="300"/>`;

    instruction.innerHTML = `<p>${meal.strInstructions}</p>`;

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    } //end of for

    let listItem = ingredients
      .map(ingredient => {
        return `<li>${ingredient}</li>`;
      })
      .join("");

    ingredientsList.innerHTML = listItem;
  }); //end of 2nd then
