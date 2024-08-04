const sendComment = (
    content: string, 
    userID: string,
    sectionID: string) =>{
        const now: Date = new Date();

        alert(
            `content: ${content} 
            userID: ${userID}
            sectionID: ${sectionID}
            time: ${now}`)

}

export default sendComment;