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
    company: data.company,
    position: data.position,
    recruiter: data.recruiter || "",
    email: data.email || "",
    salary: data.salary || "",
    priority: data.priority || "Moyenne",
    notes: data.notes || "",
    followup: data.followup || "",
    created: new Date().toISOString(),
    status: 0
  });

  save();
}

function exportData() {

  const blob = new Blob(
    [JSON.stringify(jobs, null, 2)],
    {type:"application/json"}
  );

  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = "jobtracker.json";

  a.click();
}

function importData(file){

  const reader = new FileReader();

  reader.onload = e => {

    jobs = JSON.parse(e.target.result);

    save();

    location.reload();
  };

  reader.readAsText(file);
}
