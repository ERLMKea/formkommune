import {fetchAnyUrl, restDelete, fetchRegioner} from "./modulejson.js";

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
    let img = document.createElement("img")
    img.setAttribute("src", kommune.hrefPhoto)
    img.setAttribute("alt", "hej")
    img.setAttribute("width", 150)
    img.setAttribute("height", 150)
    cell.appendChild(img)

    //Add region dropdown
    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement('select');
    regmap.forEach(kom => {
        const element = document.createElement('option');
        element.textContent = kom.navn
        element.value = kom.kode
        element.kommune = kom
        dropdown.append(element);
    })
    cell.appendChild(dropdown)
    dropdown.value = kommune.region.kode

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

function sortKommuner(kommuner) {
    return kommuner.sort((kom1, kom2) => {
        if (kom1.region.kode > kom2.region.kode) {
            return 1
        } else if (kom2.region.kode > kom1.region.kode) {
            return -1
        } else if (kom1.navn>kom2.navn) {
            return 1
        } else { return -1 }
    })
}

let kommuner = []
let regmap = new Map()

async function fetchKommuner() {
    const colhead = document.getElementById("colhead")
    tblKommuner.innerHTML = ""
    tblKommuner.appendChild(colhead)
    regmap = await fetchRegioner()
    kommuner = await fetchAnyUrl(urlKommuner)
    kommuner = sortKommuner(kommuner)
    kommuner.forEach(createTable)
}

function actionGetKommuner() {
  fetchKommuner()
}

pbCreateKommuneTable.addEventListener('click', actionGetKommuner)