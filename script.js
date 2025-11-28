function showPage(page) {
  document.getElementById("pageDashboard").style.display = "none";
  document.getElementById("pageMahasiswa").style.display = "none";
  document.getElementById("pageSetting").style.display = "none";
  document.getElementById("pageAbout").style.display = "none";

  document.getElementById(page).style.display = "block";
}

function setActive(menu) {
  document.querySelectorAll(".sidebar nav a").forEach(a => {
    a.classList.remove("active");
  });
  document.getElementById(menu).classList.add("active");
}

document.getElementById("menuDashboard").onclick = () => {
  showPage("pageDashboard");
  setActive("menuDashboard");
};

document.getElementById("menuMahasiswa").onclick = () => {
  showPage("pageMahasiswa");
  setActive("menuMahasiswa");
};

document.getElementById("menuSetting").onclick = () => {
  showPage("pageSetting");
  setActive("menuSetting");
};

document.getElementById("menuAbout").onclick = () => {
  showPage("pageAbout");
  setActive("menuAbout");
};

let database = [];

document.getElementById("formData").addEventListener("submit", function(e) {
  e.preventDefault();

  let nama = document.getElementById("nama").value;
  let nim = document.getElementById("nim").value;
  let prodi = document.getElementById("prodi").value;

  database.push({ nama, nim, prodi });

  updateTable();
  updateDashboard();

  this.reset();
});

function updateTable() {
  const body = document.getElementById("tabelBody");
  body.innerHTML = "";

  database.forEach((mhs, i) => {
    body.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.nim}</td>
        <td>${mhs.prodi}</td>
        <td>
          <button class="action-btn edit" onclick="editData(${i})">Edit</button>
          <button class="action-btn delete" onclick="deleteData(${i})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

function deleteData(i) {
  database.splice(i,1);
  updateTable();
  updateDashboard();
}

function editData(i) {
  let newNama = prompt("Nama baru:", database[i].nama);
  let newNim = prompt("NIM baru:", database[i].nim);
  let newProdi = prompt("Prodi baru:", database[i].prodi);

  if(newNama && newNim && newProdi){
    database[i] = { nama: newNama, nim: newNim, prodi: newProdi };
  }

  updateTable();
  updateDashboard();
}

function updateDashboard() {
  document.getElementById("totalData").innerText = database.length;

  let uniqueProdi = [...new Set(database.map(x => x.prodi))];
  document.getElementById("totalProdi").innerText = uniqueProdi.length;
}
