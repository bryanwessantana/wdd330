const API_KEY = "YOUR_SPOONACULAR_API_KEY";
const BASE_URL = "https://api.spoonacular.com/recipes";

export async function fetchMeals(query = "chicken") {
    try {
        const res = await fetch(`${BASE_URL}/complexSearch?query=${query}&number=3&apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch");
        return await res.json();
    } catch (err) {
        console.error("API Error", err);
        return { results: [] };
    }
}