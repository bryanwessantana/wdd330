function calcMedalFromProgress() {
  try {
    const entries = JSON.parse(localStorage.getItem("progressEntries") || "[]");
    
    if (!entries.length) return null;
    
    const avg = entries.reduce((s, e) => s + Number(e.value || 0), 0) / entries.length;
    
    if (avg >= 85) return "gold";
    if (avg >= 70) return "silver";
    if (avg >= 50) return "bronze";
    
    return null;
  } catch (err) {
    console.error("Error calculating medal from progress data:", err);
    return null;
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

  const medal = calcMedalFromProgress(); 
  if (!output) return;
  
  const storedWorkouts = JSON.parse(localStorage.getItem("myWorkouts_v1") || "[]");

  output.innerHTML = `
    <h4 style="color: var(--text-dark); margin-bottom: 0.5rem;">Welcome, ${profile.name || "user"}!</h4>
    <p>Goal: <strong>${profile.goal || "-"}</strong></p>
    <p>Current Medal: <strong>${medalToEmoji(medal)}</strong></p>
    <p style="font-size: 0.9rem; color: var(--text-light);">Age: ${profile.age || "-"} | Workouts in Plan: ${storedWorkouts.length}</p>
  `;
}

window.updateProfileDisplay = () => {
    const saved = localStorage.getItem("userProfile");

    if (saved) displayProfile(JSON.parse(saved));
    else displayProfile({});
};

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form) return;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  localStorage.setItem("userProfile", JSON.stringify(profile));

  displayProfile(profile);
});

document.addEventListener("DOMContentLoaded", () => {
  window.updateProfileDisplay();
});