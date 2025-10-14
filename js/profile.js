function calcMedalFromProgress() {
  try {
    // Attempt to retrieve progress entries for medal calculation
    const entries = JSON.parse(localStorage.getItem("progressEntries") || "[]");
    
    if (!entries.length) return null;
    
    // Calculate the average progress value
    const avg = entries.reduce((s, e) => s + Number(e.value || 0), 0) / entries.length;
    
    // Determine medal based on average
    if (avg >= 85) return "gold";
    if (avg >= 70) return "silver";
    if (avg >= 50) return "bronze";
    
    return null;
  } catch (err) {
    console.error("Error calculating medal from progress data:", err);
    return null; // Return null on error
  }
}

function medalToEmoji(m) {
  if (!m) return "—";
  if (m === "gold") return "🏅 Gold";
  if (m === "silver") return "🥈 Silver";
  if (m === "bronze") return "🥉 Bronze";
  return "—";
}


// --- Profile Logic ---

const form = document.getElementById("profileForm");
const output = document.getElementById("profileOutput");

function displayProfile(profile) {
  // Use the local medal calculation logic
  const medal = calcMedalFromProgress(); 
  if (!output) return;
  
  // Re-read myWorkouts in case they changed in scheduler.js
  const storedWorkouts = JSON.parse(localStorage.getItem("myWorkouts_v1") || "[]");

  output.innerHTML = `
    <h4 style="color: var(--text-dark); margin-bottom: 0.5rem;">Welcome, ${profile.name || "user"}!</h4>
    <p>Goal: <strong>${profile.goal || "-"}</strong></p>
    <p>Current Medal: <strong>${medalToEmoji(medal)}</strong></p>
    <p style="font-size: 0.9rem; color: var(--text-light);">Age: ${profile.age || "-"} | Workouts in Plan: ${storedWorkouts.length}</p>
  `;
}

// Global function to call from other modules when relevant data changes (profile save, schedule change)
window.updateProfileDisplay = () => {
    const saved = localStorage.getItem("userProfile");
    // Ensure the profile is loaded before trying to display it
    if (saved) displayProfile(JSON.parse(saved));
    else displayProfile({}); // Display default values if no profile is saved
};

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form) return;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  localStorage.setItem("userProfile", JSON.stringify(profile));
  // Call the display update function
  displayProfile(profile);
});

document.addEventListener("DOMContentLoaded", () => {
  window.updateProfileDisplay(); // Load profile on startup
});