export const getNotifications = (toGet: number) => {
    const listSize = allNotifications.length
    if(toGet <=  listSize)
        return allNotifications
    return [ ...allNotifications.slice(listSize-toGet)]
}

const allNotifications = [
    {
        key: '0',
        type: "mention",
        bookLink: "",
        userLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Bazy danych",
        userName: "@Kaziu87",
    },
    {
        key: '1',
        type: "approveBook",
        bookLink: "",
        userLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Fizyka",
        userName: "",
    },
    {
        key: '2',
        type: "rejectBook",
        bookLink: "",
        userLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Biologia molekularna",
        userName: "",
    },
    {
        key: '3',
        type: "mention",
        bookLink: "",
        userLink: "",
        bookCover: "",
        bookName: "The Manga Guide. Biochemia",
        userName: "@JanK_98",
    },
]
