import { getMyWorkouts } from "./workouts.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("genScheduleForm");
    const outputContainer = document.getElementById("generateSchedule");

    if (!form || !outputContainer) {
        console.error("Scheduler elements not found in the DOM.");
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get user inputs
        const sessionsPerWeek = Number(document.getElementById("sessionsPerWeek")?.value) || 1;
        const selectedDays = Array.from(document.querySelectorAll("input[name='day']:checked")).map(el => el.value);

        const myWorkouts = getMyWorkouts();
        
        // Handle no workouts or no days selected
        if (myWorkouts.length === 0) {
            outputContainer.innerHTML = "<p class='text-light'>You need to add workouts to your plan first!</p>";
            return;
        }
        if (selectedDays.length === 0) {
            outputContainer.innerHTML = "<p style='color: var(--accent);'>⚠️ Please select at least one training day.</p>";
            return;
        }

        // Generate the schedule
        const schedule = {};
        for (let i = 0; i < sessionsPerWeek; i++) {
            const day = selectedDays[i % selectedDays.length];
            const workout = myWorkouts[i % myWorkouts.length];
            
            if (!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(workout);
        }

        // Render the schedule
        outputContainer.innerHTML = "";
        for (const [day, workoutsForDay] of Object.entries(schedule)) {
            const dayElement = document.createElement("div");
            dayElement.style = "margin-bottom: 8px; border-left: 3px solid var(--secondary); padding-left: 10px;";
            dayElement.innerHTML = `<strong>${day}:</strong> ${workoutsForDay.join(", ")}`;
            outputContainer.appendChild(dayElement);
        }
    });
});