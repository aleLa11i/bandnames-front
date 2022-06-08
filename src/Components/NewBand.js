import React, { useContext, useState } from 'react'
import { SocketContext } from '../Context/SocketContext';

export const NewBand = () => {

    const [value, setValue] = useState("");
    const {socket} = useContext(  SocketContext );

    const handleSubmit = (e) => {

        e.preventDefault();
        socket.emit("NewBand", value);
        setValue("");
        
    }

    return (
        <>

            <h4>   Nueva Banda  </h4>
            
            <form className="mt-4" onSubmit={  handleSubmit  }>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ingrese nombre de banda"
                    value={  value   }
                    onChange={ e => setValue(e.target.value) }
                />

                <button 
                    className="btn btn-primary mt-2" 
                    onClick={  handleSubmit   }
                >
                    Enviar
                </button>

            </form>

        </>
    )
}
