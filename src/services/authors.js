import { Promise } from "core-js";

export const allAuthors = async () => {
    const authorsResponse = await fetch('/api/authors', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
    return authorsResponse.json();
}

export const authorById = async (id) => {
    const authors = await allAuthors();
    return authors.find(author => author.authorId === id);
}

export const signup = async (email, password) => {
    const signupResponse = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })
    return signupResponse.json();
}

export const login = async (email, password) => {
    const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })
    if (loginResponse.status === 200) {
        return loginResponse.json();
    } else {
        return Promise.resolve(undefined)
    }
}

