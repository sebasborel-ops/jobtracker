const STORAGE_KEY = "jobtracker_v2";

let jobs = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(jobs)
  );
}

function addJob(data) {

  jobs.push({
    id: Date.now(),
    company: data.company || "",
    position: data.position || "",
    recruiter: data.recruiter || "",
    email: data.email || "",
    salary: data.salary || "",
    priority: data.priority || "Moyenne",
    notes: data.notes || "",
    followup: data.followup || "",
    status: 0
  });

  save();
}

function exportData() {

  const blob = new Blob(
    [JSON.stringify(jobs, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = "jobtracker-backup.json";
  a.click();
}

function importData(file) {

  const reader = new FileReader();

  reader.onload = function (e) {

    jobs = JSON.parse(e.target.result);

    save();

    render();
  };

  reader.readAsText(file);
}

function render() {

  for(let i=0;i<5;i++) {

    const col =
      document.getElementById("col"+i);

    if(col){
      col.innerHTML="";
    }
  }

  jobs.forEach(job => {

    const card =
      document.createElement("div");

    card.className = "job";

    card.innerHTML = `
      <div class="company">
        ${job.company}
      </div>

      <div class="position">
        ${job.position}
      </div>

      <div class="meta">
        Recruteur : ${job.recruiter || "-"}
      </div>

      <div class="meta">
        Relance : ${job.followup || "-"}
      </div>

      <div class="meta">
        Priorité :
