// Manage "my workouts" from the page cards

const WORKOUT_STORAGE_KEY = "myWorkouts_v1"

function getMyWorkouts() {
    return JSON.parse(localStorage.getItem(WORKOUT_STORAGE_KEY) || "[]");
}
function saveMyWorkouts(list) {
    localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(list));
}

function updateMyPlanUI() {
    const container = document.getElementById("myPlanList");
    if (!container) return;
    const list = getMyWorkouts();
    if (!list.length) {
        container.innerHTML = "<p>No plan on your training schedule. Add from the cards.</p>";
        return;
    }
    container.innerHTML = list.map((w, i) => `
        <li>${w} <button data-index="${i}" class="remove-workout btn-small">Remove</button></li>
    `).join("");
}

function addWorkout(title) {
    const list = getMyWorkouts();
    if(!list.includes(title)) {
        list.push(title);
        saveMyWorkouts(list);
        updateMyPlanUI();
    }
}

function removeWorkout(index) {
    const list = getMyWorkouts();
    list.splice(index, 1);
    saveMyWorkouts(list);
    updateMyPlanUI();
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".workout-card .btn");
    if (btn) {
        const card = btn.closest(".workout-card");
        const title = card ? (card.querySelector("h4")?.textContent || "Workout") : "Workout";
        addWorkout(title);
    }
    if (e.target.matches(".remove-workout")) {
        const idx = Number(e.target.dataset.index);
        removeWorkout(idx);
    }
});

function generateSchedule(sessionsPerWeek, selectDays) {
    const workouts = getMyWorkouts();
    if (!workouts.length) return null;
    const days = selectedDays;
    const schedule = {};
    let wi = 0;
    for (let i = 0; i < sessionsPerWeek; i++) {
        const day = days[i % days.length];
        schedule[day] = schedule[day] || [];
        schedule[day].push(workouts[wi % workouts.length]);
        wi++;
    }
    localStorage.setItem("generatedSchedule", JSON.stringify(schedule));
    return schedule;
}

document.getElementById("genScheduleForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const sessions = Number(document.getElementById("sessionsPerWeek").value) || 3;
    const selectedDays = Array.from(document.querySelector("#genScheduleForm input[name='day']:checked")).map(i => i.value);
    if (!selectedDays.length) return alert("Select at least 1 available day");
    const schedule = generateSchedule(sessions, selectedDays);
    renderSchedule(schedule);
});

function renderSchedule(schedule) {
    const container = document.getElementById("generatedSchedule");
    if (!schedule) {
        container.innerHTML = "<p>No workout available on this plan.</p>";
        return;
    }
    container.innerHTML = Object.entries(schedule).map(([day, arr]) => `
        <div><strong>${day}:</strong> ${arr.join(", ")}</div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  updateMyPlanUI();
});