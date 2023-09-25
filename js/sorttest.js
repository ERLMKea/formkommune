const arr = ["hej", "borge", "anders"]

const srtternary = arr.sort((a,b) => (a>b) ? 1 : -1)
console.log(srtternary)

//const arrSort = arr.sort() indbygget sort af string
const arrSort = arr.sort((a,b) => {
    if (a>b) {
        return 1
    } else if (b>a) {
        return -1
    } else {
        return 0
    }
})
console.log(arrSort)

const objArr = [{"navn": "hej", "kode":"11"},{"navn": "borge", "kode":"10"},{"navn": "anders", "kode":"10"}]

const objSort = objArr.sort((a,b) => {
    if (a.kode > b.kode) {
        return 1
    } else if (b.kode > a.kode) {
        return -1
    } else if (a.navn>b.navn) {
        return 1
    } else { return -1 }

})

console.log(objSort)
