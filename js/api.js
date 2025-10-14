const API_KEY = "";
const BASE_URL = "https://api.spoonacular.com/recipes";
const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function fetchMeals(query = "chicken") {
  try {
    if (API_KEY && API_KEY.trim().length > 0) {
      // Spoonacular (requires API key)
      const res = await fetch(
        `${BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&number=6&apiKey=${API_KEY}`
      );
      if (!res.ok) throw new Error("Spoonacular fetch failed");
      return await res.json(); // shape: { results: [ { id, title, image } ] }
    } else {
      // Fallback: TheMealDB (no key required)
      const res = await fetch(`${MEALDB_BASE}/search.php?s=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("MealDB fetch failed");
      const json = await res.json();
      // Normalize to { results: [ { title, image } ] }
      const results = (json.meals || []).map((m) => ({
        id: m.idMeal,
        title: m.strMeal,
        image: m.strMealThumb,
      }));
      return { results };
    }
  } catch (err) {
    console.error("fetchMeals error:", err);
    return { results: [] };
  }
}