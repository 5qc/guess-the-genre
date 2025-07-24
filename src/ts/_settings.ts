if (!localStorage.getItem(ls.genre_no)) localStorage.setItem(ls.genre_no, "2")
if (!localStorage.getItem(ls.max_rounds)) localStorage.setItem(ls.max_rounds, "5")
if (!localStorage.getItem(ls.popularity)) localStorage.setItem(ls.popularity, "10")
if (!localStorage.getItem(ls.pop_min)) localStorage.setItem(ls.pop_min, "0")
if (!localStorage.getItem(ls.pop_max)) localStorage.setItem(ls.pop_max, "10")
if (!localStorage.getItem(ls.hide_info)) localStorage.setItem(ls.hide_info, "false")
if (!localStorage.getItem(ls.allow_explicit)) localStorage.setItem(ls.allow_explicit, "false")

// number of genres
const genreNo = <HTMLSelectElement>document.getElementById("no-of-genres")
for (let x of genreNo.children) {
    if (x.getAttribute("value") === localStorage.getItem(ls.genre_no)) {
        x.setAttribute("selected", "")
    }
}

genreNo.onchange = () => {
    localStorage.setItem(ls.genre_no, genreNo.value)
}

// number of rounds
const roundsNo = <HTMLInputElement>document.getElementById("no-of-rounds")
roundsNo.value = localStorage.getItem(ls.max_rounds)
roundsNo.onkeyup = (e) => {
    roundsNo.value = roundsNo.value.replace(/\D+/g, "")

    if (Number(roundsNo.value) > Number(roundsNo.getAttribute("max"))) {
        roundsNo.value = roundsNo.getAttribute("max")
    } else if (Number(roundsNo.value) < Number(roundsNo.getAttribute("min")) && roundsNo.value !== "") {
        roundsNo.value = roundsNo.getAttribute("min")
    }

    maxRound = Number(roundsNo.value)
    localStorage.setItem(ls.max_rounds, roundsNo.value)
}

// popularity
const popularityMinEl = <HTMLInputElement>document.getElementById("popularity-of-albums_min")
const popularityMaxEl = <HTMLInputElement>document.getElementById("popularity-of-albums_max")

popularityMinEl.onkeyup = (e) => {
    popularityMinEl.value = popularityMinEl.value.replace(/\D+/g, "")

    if (Number(popularityMinEl.value) < 0) popularityMinEl.value = "0"
    else if (Number(popularityMinEl.value) > 100) popularityMinEl.value = "100"

    localStorage.setItem(ls.pop_min, popularityMinEl.value)
}
popularityMaxEl.onkeyup = (e) => {
    popularityMaxEl.value = popularityMaxEl.value.replace(/\D+/g, "")

    if (Number(popularityMaxEl.value) < 0) popularityMaxEl.value = "0"
    else if (Number(popularityMaxEl.value) > 100) popularityMaxEl.value = "100"

    localStorage.setItem(ls.pop_max, popularityMaxEl.value)
}

popularityMinEl.value = localStorage.getItem(ls.pop_min)
popularityMaxEl.value = localStorage.getItem(ls.pop_max)

// hide info
const hideInfoEl = <HTMLInputElement>document.getElementById("hide-info")
const artistEl = <HTMLDivElement>document.querySelector(".cover .artist")
const albumEl = <HTMLDivElement>document.querySelector(".cover .album")
hideInfoEl.onchange = () => {
    if (hideInfoEl.checked) {
        artistEl.classList.add("none")
        albumEl.classList.add("none")
    } else {
        artistEl.classList.remove("none")
        albumEl.classList.remove("none")
    }

    localStorage.setItem(ls.hide_info, `${hideInfoEl.checked}`)
}

if (localStorage.getItem(ls.hide_info) === "true") {
    hideInfoEl.checked = true;
    artistEl.classList.add("none");
    albumEl.classList.add("none");
}

// allow explicit covers
const allowExplicitEl = <HTMLInputElement>document.getElementById("allow-explicit")
allowExplicitEl.onchange = () => {
    localStorage.setItem(ls.allow_explicit, `${allowExplicitEl.checked}`)
}

if (localStorage.getItem(ls.allow_explicit) === "true") {
    allowExplicitEl.checked = true
}