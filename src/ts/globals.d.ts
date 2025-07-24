type Data = {
    "artist": string,
    "album": string,
    "cover": string,
    "ratings": number,
    "genres": string[],
    "explicit": boolean
}[]

type GenreData = {
    [key: string]: string[]
}

type AliasData = {
    [key: string]: string
}