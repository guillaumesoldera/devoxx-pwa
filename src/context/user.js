import React from 'react';

const defaultValue = {
    user: undefined,
    login: (email, password) => {
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
    },
    logout: () => {}
}
export const UserContext = React.createContext(defaultValue);