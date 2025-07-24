const home = <HTMLDivElement>document.getElementById("home")
const game = <HTMLDivElement>document.getElementById("game")
const settings = <HTMLDivElement>document.getElementById("settings")
const progressBar = <HTMLDivElement>document.querySelector(".progress-bar")
const endScreen = <HTMLDivElement>document.getElementById("end-screen")
const endScreenScore = <HTMLDivElement>document.getElementById("end-score")
let previousAlbums = []

// CODE BELOW IS FOR TESTING. COMMENT OUT WHEN DONE.
newRound()
home.classList.add("none")
game.classList.remove("none")
progressBar.classList.remove("none")
localStorage.setItem(ls.genre_no, "2")
localStorage.setItem(ls.max_rounds, "1")
localStorage.setItem(ls.pop_min, "0")
localStorage.setItem(ls.pop_max, "100")
localStorage.setItem(ls.hide_info, "false")
localStorage.setItem(ls.allow_explicit, "false")
// CODE ABOVE IS FOR TESTING. COMMENT OUT WHEN DONE.

let score = 0
let currentRound = 0
let maxRound = Number(localStorage.getItem(ls.max_rounds))
const scoreEl = <HTMLDivElement>document.getElementById("score")
const btn = {
    play: <HTMLButtonElement>document.getElementById("play-btn"),
    settings: <HTMLButtonElement>document.getElementById("settings-btn")
}
btn.play.onclick = () => {
    newRound()
    home.classList.add("fade-out")
    setTimeout(() => {
        home.classList.remove("fade-out")
        home.classList.add("none")

        game.classList.add("fade-in")
        game.classList.remove("none")

        progressBar.classList.remove("none")
        progressBar.classList.add("move-in")
    }, 1000)
}

function newRound() {
    const genreCount = Number(localStorage.getItem(ls.genre_no))
    const dataset = [...data].filter(obj => obj["genres"].length === genreCount)
    const progress = <HTMLDivElement>document.getElementById("progress")

    const guesses = <HTMLDivElement>document.querySelector(".guesses")
    const genres = <HTMLDivElement>document.querySelector(".correct-genres")

    guesses.innerHTML = ""
    genres.innerHTML = ""
    genres.classList.remove("expand")
    genres.classList.add("none")

    for (let i = 0; i < Array(genreCount).length; i++) {
        guesses.insertAdjacentHTML("beforeend", `<input id="genre-guess-${i + 1}" />`)
    }

    const measurePop = 30000
    function choose() {
        const album = dataset[Math.floor(Math.random() * dataset.length)]
        if (
            !album ||
            previousAlbums.includes(album) ||
            ((album.ratings / measurePop) * 100) <= Number(localStorage.getItem(ls.pop_min)) ||
            ((album.ratings / measurePop) * 100) >= Number(localStorage.getItem(ls.pop_max)) ||
            localStorage.getItem(ls.allow_explicit) === "false" && album.explicit === true
        ) {
            return undefined
        } else {
            return album
        }
    }

    let randomAlbum = choose()
    while (!randomAlbum) {
        randomAlbum = choose()
    }

    previousAlbums.push(randomAlbum)

    const game = <HTMLDivElement>document.getElementById("game")
    const cover = <HTMLImageElement>game.querySelector("img")
    const artist = <HTMLDivElement>game.querySelector(".artist")
    const album = <HTMLDivElement>game.querySelector(".album")
    const inputs: NodeListOf<HTMLInputElement> = game.querySelectorAll(".guess input")
    const guessBtn = <HTMLButtonElement>document.getElementById("guess-btn")
    const popularityEl = <HTMLDivElement>document.getElementById("popularity-fill")

    cover.src = randomAlbum.cover
    artist.innerHTML = randomAlbum.artist
    album.innerHTML = randomAlbum.album
    if (randomAlbum.ratings / measurePop >= 1) popularityEl.style.width = "100%"
    else popularityEl.style.width = `${(randomAlbum.ratings / measurePop) * 100}%`

    for (let input of inputs) {
        input.onkeyup = (e) => {
            if (e.key === "Enter") {
                const id = Number(input.getAttribute("id").replace(/^genre-guess-/g, ""))
                if (id === genreCount) {
                    guessBtn.click()
                } else if (id < genreCount) {
                    const next_input = <HTMLInputElement>document.getElementById(`genre-guess-${id + 1}`)
                    next_input.focus()
                }
            }
        }
    }

    guessBtn.onclick = () => {
        let genreGuesses = []
        for (let x of inputs) {
            if (x.value === "") return
            genreGuesses.push(x.value)
        }
        guessBtn.setAttribute("disabled", "")

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            input.setAttribute("disabled", "")

            let neither = true
            if (typo(input.value, randomAlbum.genres) > 0.6 || randomAlbum.genres.includes(genreAliases[input.value])) {
                score += 2
                neither = false
                console.log("Score increased by 2.")

                genres.insertAdjacentHTML("beforeend", `<div id="correct-genre-${i + 1}" class="">${typo(input.value, randomAlbum.genres, true)}</div>`)
            } else {
                for (let genre of randomAlbum.genres) {
                    if (Object.keys(genreData).includes(genre) && (genreData[genre].includes(input.value) || typo(input.value, genreData[genre]) > 0.5)) {
                        if (genreGuesses.includes(genre)) continue

                        score += 1
                        neither = false
                        console.log("Score increased by 1.")

                        genres.insertAdjacentHTML("beforeend", `<div id="correct-genre-${i + 1}" class="">${genre}</div>`)
                        break
                    }
                }
            }

            if (neither) {
                let guessed_genres = []
                const GG_el: NodeListOf<HTMLDivElement> = document.querySelectorAll(".correct-genres > div")
                for (let x of GG_el) guessed_genres.push(x.innerText)

                const dsak = [...randomAlbum.genres].filter(item => !guessed_genres.includes(item))

                let id_i = 0
                for (let i = 0; i < dsak.length; i++) {
                    id_i += 1
                    if (document.getElementById(`correct-genre-${id_i}`)) id_i += 1

                    genres.insertAdjacentHTML("beforeend", `<div id="correct-genre-${id_i}" class="">${dsak[i]}</div>`)
                }
            }
        }

        genres.classList.remove("none")
        genres.classList.add("expand")

        if (localStorage.getItem(ls.hide_info) === "true") {
            artistEl.classList.remove("none")
            artistEl.classList.add("fade-in")
            
            albumEl.classList.remove("none")
            albumEl.classList.add("fade-in")

            setTimeout(() => {
                artistEl.classList.remove("fade-in")
                artistEl.classList.add("none")

                albumEl.classList.remove("fade-in")
                albumEl.classList.add("none")
            }, 3000)
        }

        // code to execute once round is over
        setTimeout(() => {
            game.classList.add("fade-out")
            scoreEl.innerText = score.toString()
            currentRound += 1
            progress.style.width = `${(currentRound / maxRound) * 100}%`
            
            setTimeout(() => {
                if (currentRound < maxRound) {
                    game.classList.remove("fade-out")
                    game.classList.add("fade-in")
                    guessBtn.removeAttribute("disabled")
                    newRound()
                    setTimeout(() => {
                        game.classList.remove("fade-in")
                    }, 1000)
                } else {
                    progressBar.classList.add("move-out")
                    setTimeout(() => {
                        progressBar.classList.remove("move-out")
                        progressBar.classList.add("none")

                        progress.removeAttribute("style")
                        scoreEl.innerText = "0"
                    }, 1000)
                    game.classList.remove("fade-out")
                    game.classList.add("none")

                    endScreenScore.innerText = score.toString()
                    endScreen.classList.remove("none")
                    endScreen.classList.add("fade-in")
                    setTimeout(() => {
                        endScreen.classList.remove("fade-in")
                        endScreen.classList.add("fade-out")

                        setTimeout(() => {
                            endScreen.classList.remove("fade-out")
                            endScreen.classList.add("none")

                            home.classList.remove("none")
                            home.classList.add("fade-in")

                            endScreenScore.innerText = "0"
                            score = 0
                            currentRound = 0
                            previousAlbums = []
                            
                            setTimeout(() => {
                                home.classList.remove("fade-in")
                            }, 1000)
                        }, 1000)
                    }, 2000)
                }
            }, 1000)
        }, 2000)
    }
}


btn.settings.onclick = () => {
    settings.classList.remove("none")
    settings.classList.add("zoom-in")
    setTimeout(() => {
        settings.classList.remove("zoom-in")
    }, 1000)
}


document.getElementById("settings-close").onclick = (e) => {
    settings.classList.add("zoom-out")
    setTimeout(() => {
        settings.classList.remove("zoom-out")
        settings.classList.add("none")
    }, 1000)
}