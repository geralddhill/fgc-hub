export type VideoGame = {
    id: number;
    name: string;
}

export const videoGames: Array<VideoGame> = [
    {
        id: 43868,
        name: "Street Fighter 6"
    },
    {
        id: 49783,
        name: "Tekken 8"
    },
    {
        id: 73221,
        name: "Fatal Fury: City of the Wolves"
    },
    {
        id: 33945,
        name: "Guilty Gear: Strive"
    },
    {
        id: 48548,
        name: "Granblue Fantasy Versus: Rising"
    },
    {
        id: 50203,
        name: "Under Night In-Birth II Sys:Celes"
    },
    {
        id: 89755,
        name: "Virtua Fighter 5 R.E.V.O."
    },
    {
        id: 36963,
        name: "The King of Fighters XV"
    },
    {
        id: 18,
        name: "Ultimate Marvel vs Capcom 3"
    },
    {
        id: 32,
        name: "Skullgirls: 2nd Encore"
    },
    {
        id: 287,
        name: "DRAGON BALL FighterZ"
    },
    {
        id: 1386,
        name: "Super Smash Bros. Ultimate"
    },
    {
        id: 1,
        name: "Super Smash Bros. Melee"
    },
    {
        id: 53945,
        name: "Rivals of Aether II"
    }
]

export const idToVideoGame = new Map(videoGames.map((game) => [game.id, game.name]))