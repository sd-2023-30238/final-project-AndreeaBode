import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import { MdPause } from "react-icons/md";


const Search = () => {


        const [objectives, setObjectives] = useState([]);

        const [mainObjectives, setMainObjectives] = useState([]);
        useEffect(() => {
            axios.get('http://localhost:8080/adminboard/objectives').then(res => {
                setObjectives(res.data);
                setMainObjectives(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }, []);


        const handleSearch = (e) => {
            setObjectives(mainObjectives.filter(u => u.locatie.toLowerCase()
            .includes(e.target.value.toLowerCase())
            ));
            console.log(e.target.value);
        }

        const handleSearchByCategory = (e) => {
            setObjectives(mainObjectives.filter(u => u.categorie.toLowerCase()
            .includes(e.target.value.toLowerCase())
            ));
            console.log(e.target.value);
        }



    return (
        <div className={'mt-5 p-4 container-fluid'}>
            <br/><br/>
            <h2>Tourist Attractions</h2>
            <br/><br/>
            <div className='row my-2 mb-4 justify-content-between w-100 mx-0'>
                <div className='form-group col-10 col-md-6 col-lg-4'>
                    <input type="text" className='form-control shadow'
                placeholder='Search Objective By Location' onChange={handleSearch} />
                </div>

                 <div className='form-group col-10 col-md-6 col-lg-4'>
                     <input type="text" className='form-control shadow'
                 placeholder='Search Objective By Category' onChange={handleSearchByCategory} />
                 </div>
            </div>


            {objectives.length ? (
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Audio Description</th>
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
                                                            <td>


                                                                <button onClick = {() => speechSynthesis.speak(new SpeechSynthesisUtterance(u.descriere_text))}> <FaPlay/></button>
                                                                &nbsp;&nbsp;
                                                                <button onClick = {() => speechSynthesis.cancel(u.descriere_text)}><MdPause/></button>



                                                            </td>
                                                            <td>{u.descriere_text}</td>
                                                            <td>{u.locatie}</td>
                                                            <td>{u.nume_obiectiv}</td>
                                                            <td>{u.pret_intrare}</td>
                                <td>

                                </td>

                                                            <td>

                                                                  <i className='fa fa-edit text-warning'></i>

                                                                <i className='fa fa-edit text-warning pointer'></i>
                                                            </td>



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
export default Search;