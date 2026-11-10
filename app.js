const STORAGE_KEY = "jobtracker_v2";

let jobs = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(jobs)
  );
}

function addCandidate() {

  const company =
    document.getElementById("company").value.trim();

  const position =
    document.getElementById("position").value.trim();

  if (!company || !position) {
    alert("Entreprise et poste obligatoires");
    return;
  }

  jobs.push({
    id: Date.now(),
    company,
    position
  });

  saveData();
  render();

  document.getElementById("company").value = "";
  document.getElementById("position").value = "";
}

function render() {

  const col =
    document.getElementById("col0");

  if (!col) return;

  col.innerHTML = "";

  jobs.forEach(job => {

    const card =
      document.createElement("div");

    card.className = "job";

    card.innerHTML = `
      <div class="company">${job.company}</div>
      <div class="position">${job.position}</div>
    `;

    col.appendChild(card);

  });

  document.getElementById("total").textContent =
    jobs.length;
}

function exportData() {

  const blob = new Blob(
    [JSON.stringify(jobs, null, 2)],
    { type: "application/json" }
  );

  const a =
    document.createElement("a");

  a.href =
    URL.createObjectURL(blob);

  a.download =
    "jobtracker-backup.json";

  a.click();
}

render();
