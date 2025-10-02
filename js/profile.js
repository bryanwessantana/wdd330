const form = document.getElementById("profileForm");
const output = document.getElementById("profileOutput");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    localStorage.setItem("userProfile", JSON.stringify(profile));
    displayProfile(profile);
});

function displayProfile(profile) {
    output.innerHTML = `
        <h4>Welcome, ${profile.name}!</h4>
        <p>Age: ${profile.age}</p>
        <p>Goal: ${profile.goal}</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("userProfile");
    if (saved) displayProfile(JSON.parse(saved));
});