import React from 'react'
import { SocketContext } from './Context/SocketContext'
import { HomePage } from './HomePage'
import { useSockets } from './hooks/useSockets';

export const App = () => {

    const {online,socket} = useSockets();
    
    return (
        <SocketContext.Provider value={   {online, socket}   }>

            <HomePage />

        </SocketContext.Provider>

    )
}
