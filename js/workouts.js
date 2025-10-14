const WORKOUT_STORAGE_KEY = "myWorkouts_v1";

export function getMyWorkouts() {
    return JSON.parse(localStorage.getItem(WORKOUT_STORAGE_KEY) || "[]");
}

function saveMyWorkouts(list) {
    localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(list));
    // Also update profile display in case workout count is shown
    if (window.updateProfileDisplay) window.updateProfileDisplay();
}

function updateMyPlanUI() {
    const container = document.getElementById("myPlanList");
    if (!container) return;
    const list = getMyWorkouts();
    if (!list.length) {
        container.innerHTML = "<p class='text-light'>No workouts added to your plan yet.</p>";
        return;
    }
    container.innerHTML = list
        .map((w, i) => `<li style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0;">
            ${w} 
            <button data-index="${i}" class="remove-workout btn tertiary" type="button" style="padding: 4px 8px; border-radius: 6px;">Remove</button>
        </li>`)
        .join("");
}

function addWorkout(title) {
    const list = getMyWorkouts();
    if (!list.includes(title)) {
        list.push(title);
        saveMyWorkouts(list);
        updateMyPlanUI();
        // FIX: Add a success message for user feedback
        alert(`"${title}" added to your plan!`); 
    } else {
        // Optional: inform the user if the workout is already in the list
        alert(`"${title}" is already in your plan.`);
    }
}

function removeWorkout(index) {
    const list = getMyWorkouts();
    list.splice(index, 1);
    saveMyWorkouts(list);
    updateMyPlanUI();
}

document.addEventListener("click", (e) => {
    // Add to plan: detect a button inside a .workout-card
    if (e.target.matches(".workout-card .btn")) {
        const card = e.target.closest(".workout-card");
        // FIX: Get the title from the specific card that was clicked
        const title = card ? (card.querySelector("h4")?.textContent?.trim() || "Workout") : "Workout";
        addWorkout(title);
    }
    // Remove workout from plan
    if (e.target.matches(".remove-workout")) {
        const idx = Number(e.target.dataset.index);
        removeWorkout(idx);
    }
});

document.addEventListener("DOMContentLoaded", updateMyPlanUI);