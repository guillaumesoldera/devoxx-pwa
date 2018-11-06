import React from 'react';

const defaultValue = {
    user: undefined,
    login: () => { },
    logout: () => { },
    signup: () => { }
}
export const UserContext = React.createContext(defaultValue);