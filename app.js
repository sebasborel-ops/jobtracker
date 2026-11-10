let jobs = [];

function addCandidate() {

  const company =
    document.getElementById("company").value;

  const position =
    document.getElementById("position").value;

  if (!company || !position) {
    alert("Entreprise et poste obligatoires");
    return;
  }

  const card = document.createElement("div");

  card.className = "job";

  card.innerHTML = `
    <div class="company">${company}</div>
    <div class="position">${position}</div>
  `;

  document
    .getElementById("col0")
    .appendChild(card);

  document.getElementById("company").value = "";
  document.getElementById("position").value = "";
}

function exportData() {
  alert("Export à venir");
}
