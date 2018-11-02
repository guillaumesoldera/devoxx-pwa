import {allAuthors} from './authors';

export const allComments = async () => {
    return await Promise.resolve([{
        commentId:"1",
        postId: "1",
        authorId: "1",
        date: '19 Oct',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
    },
    {
        commentId:"1",
        postId: "1",
        authorId: "1",
        date: '19 Oct',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
    }])
}