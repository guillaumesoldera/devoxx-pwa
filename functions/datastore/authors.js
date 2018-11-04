const db = require('./firestore');

const addAuthor = async (email, password) => {
    const newAuthor = await db.collection('authors').add({
        fullName: '',
        bio: '',
        profilePicture: '',
        email,
        password
    });
    return { id: newAuthor.id, fullName: '', bio: '' }
}

const updateAuthor = async (authorId, fullName, bio, profilePicture) => {
    const authorRef = db.collection('authors').doc(authorId);
    await authorRef.update({
        fullName,
        bio,
        profilePicture,
    });
    return { authorId, fullName, bio, profilePicture }
}

const logAuthor = async (email, password) => {
    const snapshot = await db.collection('authors').get();
    console.log('email, password', email, password)
    const authors = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        authors.push({
            authorId: doc.id,
            ...data
        })
        console.log(doc.id, '=>', doc.data());
    })
    const author = authors.find(_author => _author.email == email && _author.password == password);
    return author && { id: author.authorId, fullName: author.fullName, bio: author.bio }
}

const allAuthors = async () => {
    const snapshot = await db.collection('authors').get();
    const authors = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        authors.push({
            authorId: doc.id,
            ...data
        })
        console.log(doc.id, '=>', doc.data());
    })
    return authors.map(_author => ({
        authorId: _author.authorId,
        fullName: _author.fullName,
        bio: _author.bio,
        profilePicture: _author.profilePicture
    }))
}

module.exports = {
    addAuthor,
    logAuthor,
    allAuthors,
    updateAuthor,
}