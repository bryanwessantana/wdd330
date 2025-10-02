import { fetchMeals } from "./api.js"

const form = document.getElementById("mealSearchForm");
const resultsDiv = document.getElementById("mealCards");
const mealLoader = document.getElementById("mealLoader");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("mealQuery").value.trim() || "salad";
    
    resultsDiv.innerHTML = "";
    mealLoader.classList.add("active");

    try {
        const data = await fetchMeals(query);
        renderMeals(data.results);
    } catch (err) {
        resultsDiv.innerHTML = "<p>❌ Error loading meals. Try again.</p>"
        console.error(err);
    } finally {
        mealLoader.classList.remove("active");
    }
});

function renderMeals(meals) {
    resultsDiv.innerHTML = meals.map(meal => `
        <div class="meal-card">
            <img src="${meal.image}" alt="${meal.title}">
            <h4>${meal.title}</h4>
        </div>
    `).join("");
}