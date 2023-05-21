import React, { useEffect, useState } from 'react';

import axios from 'axios';


const Comments = () => {

    const [comments, setComments] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/comments').then(res => {
            setComments(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (

        <div className={'mt-5 p-4 container-fluid'}>
            <br/><br/>
            <h2>Your comments</h2>
            <br/><br/>


            {comments.length ? (
                <table className='table'>
                    <thead>
                    <tr>

                        <th scope="col">Description</th>
                        <th scope="col">Username</th>
                        <th scope="col">Nume obiectiv</th>
                        <th scope="col">Data</th>
                        <th scope="col">Ora</th>

                    </tr>
                    </thead>
                    <tbody>
                    {comments.map(u =>

                        <tr key={u.data}>
                            <td>{u.descriere}</td>
                            <td>{u.username}</td>
                            <td>{u.obiectiv}</td>
                            <td>{u.data}</td>
                            <td>{u.ora}</td>




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
export default Comments;