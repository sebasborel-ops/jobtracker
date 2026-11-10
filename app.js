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

  if(!company || !position){
    alert("Entreprise et poste obligatoires");
    return;
  }

  jobs.push({
    id: Date.now(),
    company,
    position,
    recruiter: document.getElementById("recruiter").value,
    email: document.getElementById("email").value,
    salary: document.getElementById("salary").value,
    followup: document.getElementById("followup").value,
    notes: document.getElementById("notes").value,
    priority: document.getElementById("priority").value,
    status: 0
  });

  saveData();
  render();

  document.getElementById("company").value="";
  document.getElementById("position").value="";
  document.getElementById("recruiter").value="";
  document.getElementById("email").value="";
  document.getElementById("salary").value="";
  document.getElementById("followup").value="";
  document.getElementById("notes").value="";
}

function move(id,direction){

  const job =
    jobs.find(j=>j.id===id);

  if(!job) return;

  job.status += direction;

  if(job.status<0) job.status=0;
  if(job.status>4) job.status=4;

  saveData();
  render();
}

function deleteJob(id){

  jobs =
    jobs.filter(j=>j.id!==id);

  saveData();
  render();
}

function exportData
