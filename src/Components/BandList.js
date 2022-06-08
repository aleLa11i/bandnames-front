import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocketContext } from '../Context/SocketContext';

export const BandList = () => {

    const [bands, setBands] = useState([]);
    const [editname, setEditname] = useState(false);
    const { socket  } = useContext(  SocketContext );

    
    useEffect(() => {

        socket.on("GetBands", (data) => {
            setBands(  data  );
        }) 

        return () => socket.off("GetBands");
        
    }, [socket]);



    
    const IncreaseVotes = (id) => {
        socket.emit("IncreaseVotes", id );
    };

    const DeleteBand = (id) => {
        socket.emit("DeleteBand", id );
    };

    const changeName = (e, id) => {
        const name = e.target.value;
        
        setBands(bands.map( band => {


            if(band.id === id)
            {
                band.name = name;
            }
            
            return band;
        }))

        socket.emit("ChangeNameBand", {
            id,
            name
        } );
    }




    const newRow = () => {

       return bands.map(band =>{
           
            return (<tbody key={band.id}>
                <tr>
                    <td>
                        <button 
                            className="btn btn-primary"
                            onClick={() => IncreaseVotes(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        {
                            (editname)
                            ?
                            (<input 
                                type="form-control" 
                                value={band.name}
                                onChange={  e => changeName( e , band.id  )}
                            />)
                            :
                            (<h4>
                                {
                                    band.name
                                }
                            </h4>)
                        }
                            
                        
                    </td>
                    <td>
                        <h3>
                            {band.votes}
                        </h3>
                    </td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={() => DeleteBand(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            </tbody>)

        })

        
    }

    return (
        <>
            <div className="d-flex justify-content-around">
                <h4>   Lista de Bandas  </h4>
                
                {
                    (editname)
                    ?
                    (<button 
                        className="btn btn-success"
                        onClick={() => setEditname(false)}
                    >
                        OK
                    </button>)
                    :
                    (<button 
                        className="btn btn-primary"
                        onClick={() => setEditname(true)}
                    >
                        Editar nombre
                    </button>)
                }
                

            </div>

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                {
                    newRow()
                }
            </table>

        </>
    )
}
