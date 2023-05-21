import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Header from './header';
import Search from "../../home-page/components/Search"; 

const Wishboard = () => {

    const [objectives, setObjectives] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/wishboard').then(res => {
            setObjectives(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
      
        <div className={'mt-5 p-4 container-fluid'}>
            <br/><br/>
            <h2>Your wishlist</h2>
            <br/><br/>


            {objectives.length ? (
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Text Description</th>
                        <th scope="col">Location</th>
                        <th scope="col">Objective Name</th>
                        <th scope="col">Entrance Fee</th>
                    </tr>
                    </thead>
                    <tbody>
                    {objectives.map(u =>
                        <tr key={u.nume_obiectiv}>

                            <th scope="row">{u.categorie}</th>

                            <td>{u.descriere_text}</td>
                            <td>{u.locatie}</td>
                            <td>{u.nume_obiectiv}</td>
                            <td>{u.pret_intrare}</td>

                        </tr>
                    )}
                    </tbody>
                </table>
            ) : (
                <h6 className='text-center text-info'>wating ...</h6>
            )}

        </div>
    )
}
export default Wishboard;