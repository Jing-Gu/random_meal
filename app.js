const mealBtn = document.querySelector(".meal-btn");
const mealName = document.querySelector(".meal-name");
const mealCat = document.querySelector(".meal-category");
const mealArea = document.querySelector(".meal-area");
const mealTag = document.querySelector(".meal-tag");
const mealImage = document.querySelector(".meal-image");
const ingredientsList = document.querySelector(".ingredients-list");
const instruction = document.querySelector(".instructions");
const youTube = document.querySelector(".iframe-container");
const menu = document.querySelector(".menu");
const startText = document.querySelector(".start p");
const sideInfo = document.querySelector(".side-info");

mealBtn.addEventListener("click", () => {
  menu.style.display = "block";
  menu.classList.add("animated", "bounceInUp");
  document.body.style.overflowY = "scroll";
  startText.style.opacity = 0;
  sideInfo.style.right = "5px";
  sideInfo.classList.add("animated", "slideInRight");

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      console.log(data.meals[0]);
      let meal = data.meals[0];

      mealName.innerHTML = `<h1>${meal.strMeal}</h1>`;
      mealArea.innerHTML = `<p><b>Area:</b> ${meal.strArea}</p>`;
      mealCat.innerHTML = `<p><b>Category:</b> ${meal.strCategory}</p>`;
      instruction.innerHTML = `<p>${meal.strInstructions}</p>`;

      if (meal.strTags) {
        mealTag.innerHTML = `<p><b>Tags:</b> ${meal.strTags
          .split(",")
          .join(", ")}</p>`;
      } else {
        mealTag.innerHTML = "";
      }

      mealImage.innerHTML = `<img src="${meal.strMealThumb}" alt="meal image" width="300"/>`;

      youTube.innerHTML = `<iframe
      width="560"
      height="315"
      src= "https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;

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
}); //end of click listener
