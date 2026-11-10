const STORAGE_KEY = "jobtracker_v2";

const STATUS = [
  "À envoyer",
  "Envoyée",
  "Entretien",
  "Offre",
  "Refus"
];

let jobs = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(jobs)
  );
}

function stats() {

  const total = jobs.length;

  const entretien =
    jobs.filter(j => j.status === 2).length;

  const offre =
    jobs.filter(j => j.status === 3).length;

  const refus =
    jobs.filter(j => j.status === 4).length;

  return {
    total,
    entretien,
    offre,
    refus,
    tauxEntretien:
      total ? Math.round(entretien * 100 / total) : 0
  };
}

function addJob(data) {

  jobs.push({
    id: Date.now(),
    company: data.company,
    position: data.position,
    recruiter: data.recruiter || "",
    email: data.email || "",
    salary: data.salary || "",
    priority: data.priority || "Moyenne",
    notes: data.notes || "",
    followup: data.followup || "",
    created
function render() {

  for(let i=0;i<5;i++) {

    const col =
      document.getElementById("col"+i);

    if(col){
      col.innerHTML="";
    }
  }

  const search =
    document.getElementById("search")?.value?.toLowerCase() || "";

  const filtered = jobs.filter(job => {

    return (
      job.company.toLowerCase().includes(search) ||
      job.position.toLowerCase().includes(search)
    );

  });

  filtered.forEach(job => {

    const card = document.createElement("div");
    card.className = "job";

    let priorityClass = "low";

    if(job.priority === "Haute"){
      priorityClass = "high";
    }

    if(job.priority === "Moyenne"){
      priorityClass = "medium";
    }

    card.innerHTML = `
      <div class="company">${job.company}</div>
      <div class="position">${job.position}</div>

      <div class="meta">
        Recruteur : ${job.recruiter || "-"}
      </div>

      <div class="meta">
        Email : ${job.email || "-"}
      </div>

      <div class="meta">
        Salaire : ${job.salary || "-"}
      </div>

      <div class="meta">
        Relance : ${job.followup || "-"}
      </div>

      <div style="margin-top:8px">
        <span class="priority ${priorityClass}">
          ${job.priority}
        </span>
      </div>

      <div class="meta">
        ${job.notes || ""}
      </div>
    `;

    const actions =
      document.createElement("div");

    actions.className =
      "card-actions";

    const left =
      document.createElement("button");

    left.className = "btn";
    left.textContent = "◀";

    left.onclick = () => {

      moveLeft(job.id);

      render();

    };

    const right =
      document.createElement("button");

    right.className = "btn";
    right.textContent = "▶";

    right.onclick = () => {

      moveRight(job.id);

      render();

    };

    const del =
      document.createElement("button");

    del.className = "btn";
    del.textContent = "🗑";

    del.onclick = () => {

      if(confirm("Supprimer ?")){

        removeJob(job.id);

        render();

      }
    };

    actions.appendChild(left);
    actions.appendChild(right);
    actions.appendChild(del);

    card.appendChild(actions);

    document
      .getElementById("col"+job.status)
      .appendChild(card);

  });

  const s = stats();

  document.getElementById("total").textContent =
    s.total;

  document.getElementById("entretiens").textContent =
    s.entretien;

  document.getElementById("offres").textContent =
    s.offre;

  document.getElementById("taux").textContent =
    s.tauxEntretien + "%";
}

document.addEventListener("DOMContentLoaded", () => {

  const search =
    document.getElementById("search");

  if(search){

    search.addEventListener(
      "input",
      render
    );
  }

  render();

});
