export const allComments = async () => {
    const commentsReponse = await fetch('/api/comments', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
    return commentsReponse.json();
}