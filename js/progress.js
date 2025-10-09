const FORM_ID = "progressForm";
const storageKey = "progressEntries";

function getEntries() {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
}
function saveEntries(entries) {
    localStorage.setItem(storageKey, JSON.stringify(entries));
}

function renderList() {
    const listEl = document.getElementById("progressList");
    const entries = getEntries().slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    if (!listEl) return;
    listEl.innerHTML = entries.map((e, i) => `
    <li>
    ${e.date} - ${e.value}%
    <button class="delete-entry" data-i="${i}">remove</button>
    </li>`).join("");
}

let chartInstance = null;
function renderChart() {
  const ctx = document.getElementById("progressChart");
  if (!ctx) return;
  const entries = getEntries().slice().sort((a,b)=> new Date(a.date) - new Date(b.date));
  const labels = entries.map(e => e.date);
  const data = entries.map(e => Number(e.value));
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx.getContext("2d"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Progresso (%)",
        data,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { min: 0, max: 100 }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

document.addEventListener("submit", (ev) => {
    if (ev.target && ev.target.id === FORM_ID) {
        ev.preventDefault();
        const date = document.getElementById("entryDate").value;
        const value = document.getElementById("entryValue").value;
        if (!date || value === "") return alert("Preencha data e valor");
        const entries = getEntries();
        entries.push({ date, value: Number(value) });
        saveEntries(entries);
        renderList();
        renderChart();
        if (window.updateProfileDisplay) window.updateProfileDisplay();
        ev.target.reset();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.matches(".delete-entry")) {
        const idx = Number(e.target.dataset.i);
        const arr = getEntries();
        arr.splice(idx, 1);
        saveEntries(arr);
        renderList();
        renderChart();
        if (window.updateProfileDisplay) window.updateProfileDisplay();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("entryDate");
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
    renderList();
    renderChart();
});