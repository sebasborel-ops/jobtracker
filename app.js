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
