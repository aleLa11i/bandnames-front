
import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';


export const useSockets = () => {

    const [online, setOnline] = useState(false);

    const serverPath = "http://localhost:8080";

    const socket = useMemo(() => {
        
        return io.connect(serverPath, {
            transports: ["websocket"]
        })
    }, 
    [serverPath]);

    useEffect(() => {
        setOnline(socket.connected);

    }, [socket]);

    useEffect(() => {

        socket.on("connect", () => {
            setOnline(  true  );
        })
        
    }, [socket]);

    useEffect(() => {

        socket.on("disconnect", () => {
            setOnline(  false  );
        })
        
    }, [socket]);
    
    
    return  {
        socket,
        online
    };
}