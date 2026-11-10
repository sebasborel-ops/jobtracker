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
    company: company,
    position: position,
    recruiter: document.getElementById("recruiter").value || "",
    email: document.getElementById("email").value || "",
    salary: document.getElementById("salary").value || "",
    followup: document.getElementById("followup").value || "",
    notes: document.getElementById("notes").value || "",
    priority: document.getElementById("priority").value || "Moyenne",
    status: 0
  });

  saveData();

  clearForm();

  render();
}

function clearForm() {

  document.getElementById("company").value = "";
  document.getElementById("position").value = "";
  document.getElementById("recruiter").value = "";
  document.getElementById("email").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("followup").value = "";
  document.getElementById("notes").value = "";
}

function moveCandidate(id, direction) {

  const job = jobs.find(j => j.id === id);

  if (!job) return;

  job.status += direction;

  if (job.status < 0) {
    job.status = 0;
  }

  if (job.status > 4) {
    job.status = 4;
  }

  saveData();

  render();
}

function deleteCandidate(id) {

  if (!confirm("Supprimer cette candidature ?")) {
    return;
  }

  jobs = jobs.filter(
    j => j.id !== id
  );

  saveData();

  render();
}

function exportData() {

  const data =
    JSON.stringify(
      jobs,
      null,
      2
    );

  const blob = new Blob(
    [data],
    {
      type: "application/json"
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "jobtracker-backup.json";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function importData(file) {

  const reader =
    new FileReader();

  reader.onload = function(event) {

    try {

      jobs =
        JSON.parse(
          event.target.result
        );

      saveData();

      render();

    } catch {

      alert(
        "Fichier JSON invalide"
      );

    }
  };

  reader.readAsText(file);
}

function render() {

  for (let i = 0; i < 5; i++) {

    const col =
      document.getElementById(
        "col" + i
      );

    if (col) {
      col.innerHTML = "";
    }
  }

  jobs.forEach(job => {

    const card =
      document.createElement("div");

    card.className =
      "job";

    card.innerHTML = `
      <div class="company">
        ${job.company}
      </div>

      <div class="position">
        ${job.position}
      </div>

      <div class="meta">
        Priorité : ${job.priority}
      </div>

      <div class="meta">
        Recruteur : ${job.recruiter || "-"}
      </div>

      <div class="meta">
        Relance : ${job.followup || "-"}
      </div>

      <div class="card-buttons">

        <button onclick="moveCandidate(${job.id},-1)">
          ◀
        </button>

        <button onclick="moveCandidate(${job.id},1)">
          ▶
        </button>

        <button onclick="deleteCandidate(${job.id})">
          🗑
        </button>

      </div>
    `;

    document
      .getElementById(
        "col" + job.status
      )
      .appendChild(card);
  });

  const total =
    jobs.length;

  const entretiens =
    jobs.filter(
      j => j.status === 2
    ).length;

  const offres =
    jobs.filter(
      j => j.status === 3
    ).length;

  document.getElementById("total")
    .textContent = total;

  document.getElementById("entretiens")
    .textContent = entretiens;

  document.getElementById("offres")
    .textContent = offres;

  document.getElementById("taux")
    .textContent =
      total
      ? Math.round(
          entretiens * 100 / total
        ) + "%"
      : "0%";
}

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const importField =
      document.getElementById(
        "importFile"
      );

    if (importField) {

      importField.addEventListener(
        "change",
        function(e) {

          if (
            e.target.files &&
            e.target.files[0]
          ) {
            importData(
              e.target.files[0]
            );
          }
        }
      );
    }

    render();
  }
);
