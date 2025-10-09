const form = document.getElementById("profileForm");
const output = document.getElementById("profileOutput");

form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const storedWorkouts = JSON.parse(localStorage.getItem("myWorkouts_v1") || "[]");
    profile.myWorkouts = storedWorkouts;

    localStorage.setItem("userProfile", JSON.stringify(profile));
    displayProfile(profile);
});

function displayProfile(profile) {
  const medal = calcMedalFromProgress(); // usa localStorage da Parte 2 (se existir)
  output.innerHTML = `
    <h4>Welcome, ${profile.name || "user"}!</h4>
    <p>Age: ${profile.age || "-"}</p>
    <p>Goal: ${profile.goal || "-"}</p>
    <p>Plan: ${profile.myWorkouts?.length ? profile.myWorkouts.join(", ") : "None"}</p>
    <p>Medal: ${medalToEmoji(medal)}</p>
  `;
}

function medalToEmoji(m) {
    if (!m) return "—";
    if (m === "gold") return "🏅 (Gold)";
    if (m === "silver") return "🥈 (Silver)";
    if (m === "bronze") return "🥉 (Bronze)";
    return "—";
}

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
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("userProfile");
    if (saved) displayProfile(JSON.parse(saved));
});