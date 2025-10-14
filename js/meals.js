import { fetchMeals } from "./api.js";

const form = document.getElementById("mealSearchForm");
const resultsDiv = document.getElementById("mealCards");
const mealLoader = document.getElementById("mealLoader");
const mealQueryInput = document.getElementById("mealQuery");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = (mealQueryInput?.value || "").trim() || "salad";

    if (resultsDiv) resultsDiv.innerHTML = "";
    mealLoader?.classList.add("active");

    try {
      const data = await fetchMeals(query);
      const meals = data.results || [];
      if (!meals.length) {
        if (resultsDiv) resultsDiv.innerHTML = `<p class="text-center mt-2">No meals found for "${query}".</p>`;
      } else {
        renderMeals(meals);
      }
    } catch (err) {
      console.error(err);
      if (resultsDiv) resultsDiv.innerHTML = `<p class="text-center mt-2">Error loading meals. Please check your network.</p>`;
    } finally {
      mealLoader?.classList.remove("active");
    }
  });
}

const renderMeals = (meals) => {
  if (!resultsDiv) return;
  resultsDiv.innerHTML = meals
    .map(
      (meal) => `
    <div class="card-base supplement-card">
      <img src="${meal.image || ''}" alt="${(meal.title || '').replace(/"/g, "'")}" loading="lazy">
      <h4>${meal.title || ''}</h4>
      <p>A delicious and healthy meal option.</p>
    </div>
  `
    )
    .join("");
};