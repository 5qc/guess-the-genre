const genreAliases: AliasData = {
    "edm": "electronic dance music",
    "hnw": "harsh noise wall"
}

const genreData: GenreData = {
	"alternative metal": ["metal"],
	"neo-soul": ["soul"],
	"shoegaze": ["alternative rock", "rock"],
	"emo": ["rock", "punk"],
	"screamo": ["emo", "post-hardcore", "hardcore", "hardcore punk"],
	"drumless": ["hip hop", "rap"],
	"modern classical": ["classical music", "classical"],
	"chamber music": ["classical music", "classical"],
	"blackgaze": ["atmospheric black metal", "black metal", "shoegaze"],
	"epic collage": ["sound collage"],
	"latin electronic": ["electronic"],
	"post-hardcore": ["hardcore"],
	"post-metal": ["metal"],
	"post-rock": ["rock"],
	"art pop": ["experimental pop", "pop"],
	"black metal": ["metal"],
	"thrash metal": ["metal"],
	"dissonant black metal": ["black metal", "metal"],
	"avant-garde metal": ["metal", "experimental metal"],
	"jazz pop": ["jazz", "pop"],
	"dream pop": ["pop"],
	"indie pop": ["pop", "independent pop"],
	"brutal death metal": ["death metal", "metal", "brutal metal"],
	"technical death metal": ["death metal", "metal", "technical metal"],
	"dissonant death metal": ["death metal", "metal", "dissonant metal"],
	"technical thrash metal": ["thrash metal", "technical metal", "metal"],
	"electronic dance music": ["edm"],
	"atmospheric sludge metal": ["atmospheric metal", "sludge metal", "metal"],
	"hardcore hip hop": ["horrorcore", "hip hop", "rap"],
	"horrorcore": ["hardcore hip hop", "hip hop", "rap"],
	"atmospheric black metal": ["black metal", "metal"],
    "harsh noise": ["noise", "harsh noise wall"],
    "noise": ["harsh noise", "harsh noise wall"],
    "harsh noise wall": ["noise", "harsh noise"],
    "vapornoise": ["vaporwave"],
	"abstract hip hop": ["hip hop", "rap"],
	"pop rap": ["rap", "hip hop"]
}

// for logging how many albums are in the database.
let DATAFORCONSOLE = {}
for (let x of data) {     if (!Object.keys(DATAFORCONSOLE).includes(`genre_${x.genres.length}`)) DATAFORCONSOLE[`genre_${x.genres.length}`] = 0
    DATAFORCONSOLE[`genre_${x.genres.length}`] += 1
}

console.log(`Currently ${data.length} albums in the database.

1 genre:  ${DATAFORCONSOLE["genre_1"]}
2 genres: ${DATAFORCONSOLE["genre_2"]}
3 genres: ${DATAFORCONSOLE["genre_3"]}
4 genres: ${DATAFORCONSOLE["genre_4"]}
5 genres: ${DATAFORCONSOLE["genre_5"]}`)