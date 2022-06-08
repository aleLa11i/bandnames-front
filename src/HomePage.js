import React, { useContext  } from 'react';
import { BandList } from './Components/BandList';
import { BandsChart } from './Components/BandsChart';
import { NewBand } from './Components/NewBand';
import { SocketContext } from './Context/SocketContext';

export const HomePage = () => {

    const {online} = useContext(  SocketContext );

    return (
        <div className="container">
            
            <div className="d-inline-flex alert">
                <h6>
                    Service Status: 
                    {
                        (online)
                        ?   <span className="text-success">  Online  </span> 
                        :   <span className="text-danger">  Offline  </span>
                    }
                </h6>
            </div>

            <h1>BandNames   App</h1>
            <hr/>

            <div className="row">
                <div  className="col-7">
                        <BandsChart  />
                </div>
            </div>

            <hr/>

            <div className="row">
                <div  className="col-7">
                    <BandList  />
                </div>

                <div  className="col-4">
                    <NewBand />
                </div>

            </div>

        </div>
    )
}
