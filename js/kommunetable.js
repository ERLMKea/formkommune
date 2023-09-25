import {fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommuner = "http://localhost:8080/kommuner"
const urlKommune = "http://localhost:8080/kommune"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length

    let row = tblKommuner.insertRow(rowCount)
    row.id = kommune.navn

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.kode

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn

    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1"
    pbDelete.onclick = function() {
        document.getElementById(kommune.navn).remove();
        deleteKommune(kommune);
    }
    row.appendChild(pbDelete)
}

async function deleteKommune(kommune) {
  try {
     const url = urlKommune + "/" + kommune.kode
     const resp = await restDelete(url)
     const body = await resp.text();
     alert(body)
  } catch (error) {
      alert(error.message);
      console.log(error);
  }
}


let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommuner)
    kommuner.forEach(createTable)
}

function actionGetKommuner() {
  fetchKommuner()
}

pbCreateKommuneTable.addEventListener('click', actionGetKommuner)