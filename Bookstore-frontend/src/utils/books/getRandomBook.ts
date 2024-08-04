import axios from 'axios';
import { authToken } from '../session';

/**
 * Function returns random Book from database
 * @return {object} simple dict with book title and isbn.
 */
const getRandomBook = async ()
    : Promise<object> => {
    let outObject = { "title": null, "isbn": null }
    const token = await authToken();
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    try {
        await axios.get(
            '/book'
  ).then(response => {
            console.log(response.data);
            let num = Math.floor(Math.random() * 100);
            outObject.title = response.data[num].title
            outObject.isbn = response.data[num].isbn
        })

    } catch (error) {
        console.log(error)
    }
    console.log("OUT getRandomBook")
    return outObject
};

export { getRandomBook };
