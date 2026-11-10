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

function render() {

  for(let i = 0; i < 5; i++) {

    const col =
      document.getElementById("col" + i);

    if(col){
      col.innerHTML = "";
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
        Priorité : ${job.priority || "-"}
      </div>

      <div class="meta">
        Recruteur : ${job.recruiter || "-"}
      </div>

      <div class="meta">
        Relance : ${job.followup || "-"}
      </div>

      <div style="margin-top:10px;display:flex;gap:5px;">

        <button
          class="btn"
          onclick="moveCandidate(${job.id},-1)">
          ◀
        </button>

        <button
          class="btn"
          onclick="moveCandidate(${job.id},1)">
      
