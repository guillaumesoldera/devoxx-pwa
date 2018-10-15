import React from 'react';

const defaultValue = {
    user: undefined,
    login: () => {},
    logout: () => {}
}

export const UserContext = React.createContext(defaultValue);
