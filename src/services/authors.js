export const allAuthors = async () => {
    return Promise.resolve([{
        authorId: "1",
        fullName: 'Jack Vagabond',
        bio: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
        profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg'
    }])
}

export const authorById = async (id) => {
    const authors = await allAuthors();
    return authors.find(author => author.authorId === id);
}
