import {fetchAnyUrl} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length

    let row = tblKommuner.insertRow(rowCount)

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
    row.appendChild(pbDelete)


}

let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune)
    kommuner.forEach(createTable)
}

function actionGetKommuner() {
  fetchKommuner()
}

pbCreateKommuneTable.addEventListener('click', actionGetKommuner)