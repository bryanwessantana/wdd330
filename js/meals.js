import { fetchMeals } from "./api.js";

const form = document.getElementById("mealSearchForm");
const resultsDiv = document.getElementById("mealCards");
const mealLoader = document.getElementById("mealLoader");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("mealQuery").value.trim() || "salad";
    resultsDiv.innerHTML = "";
    mealLoader.classList.add("active");

    try {
      const data = await fetchMeals(query);
      const meals = data.results || [];
      if (!meals.length) {
        resultsDiv.innerHTML = `<p>No meals found to "${query}".</p>`;
      } else {
        renderMeals(meals);
      }
    } catch (err) {
      console.error(err);
      resultsDiv.innerHTML = `<p>Error loading meals. Try again.</p>`;
    } finally {
      mealLoader.classList.remove("active");
    }
  });
}

function renderMeals(meals) {
  resultsDiv.innerHTML = meals
    .map(
      (meal) => `
    <div class="meal-card">
      <img src="${meal.image || ''}" alt="${meal.title || ''}" loading="lazy" onerror="this.style.opacity=.6">
      <h4>${meal.title || ''}</h4>
    </div>
  `
    )
    .join("");
}

// Optional: run a default search on load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("mealQuery")) {
    // trigger default search once
    document.getElementById("mealQuery").value = "salad";
    form.dispatchEvent(new Event("submit"));
  }
});