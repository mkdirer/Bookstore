import placeholderImg from "../../assets/images/icons/placeholder.jpg"

const getBookCover = async (isbn: string): Promise<string> => {
    console.log("isbn:" + isbn);
    if (isbn !== "") {
        if( checkImageSize(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`) ){
            console.log( "return true" )
            return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
        }
    }
    return placeholderImg
};


const checkImageSize = (imgSrc: string): boolean => {
    const img = new Image();
    img.src = imgSrc;
    let isOK = false;
    console.log("img.naturalWidth " + img.naturalWidth)
    console.log("img.naturalHeight " + img.naturalHeight)
    if (img.naturalWidth > 1 && img.naturalHeight > 1) {
        isOK = true;
    } 
    return isOK;
};



export { getBookCover };