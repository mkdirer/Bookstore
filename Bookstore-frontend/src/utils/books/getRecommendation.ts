import axios from "axios";
import { authToken } from "../session";
import { getBookCover } from "./getBookCover";

interface RecommendationDetails {
    id: number,
    title: string,
    isbn: string,
    imgURL: string,
}

const getRecommendation = async (): Promise<RecommendationDetails> => {
    let out: RecommendationDetails = {
        id: -1,
        title: "",
        isbn: "",
        imgURL: ""
    }

    const token = await authToken();
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    try {
        await axios.get(
            '/book'
        ).then(response => {
            console.log(response.data);
            let num = Math.floor(Math.random() * 100);
            console.log("num " + num)
            out.id = response.data[num].id
            out.title = response.data[num].title
            out.isbn = response.data[num].isbn
        })

    } catch (error) {
        console.log(error)
    }

    out.imgURL = await getBookCover(out.isbn)

    return out
}

export type { RecommendationDetails }
export { getRecommendation }