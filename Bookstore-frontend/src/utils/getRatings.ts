export const getRatings = (toGet: number) => {
    const listSize = allRatings.length
    if(toGet <=  listSize)
        return allRatings
    return [ ...allRatings.slice(listSize-toGet)]
}

const allRatings = [
    {
        key: '0',
        bookLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Bazy danych",
        value: 5,
    },
    {
        key: '1',
        bookLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Fizyka",
        value: 2,
    },
    {
        key: '2',
        bookLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Biologia molekularna",
        value: 3,
    },
    {
        key: '3',
        bookLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Biochemia",
        value: 4,
    },
]
