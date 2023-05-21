import React from 'react';
import { Link } from 'react-router-dom';
import stil from './stil.css';
import {Button} from 'reactstrap';
import ContactUs from './ContactUs'

const div = {
   padding: '100px 30px 0 68px'
};

const TouristPage = () => { 
    return (
        <div style={div}>

                <Button
                     className='btns'
                     buttonStyle='btn--outline'
                     buttonSize='btn--large'
                     >
                     {/*<Link to="/login" className="btns" style={{color: 'lightgrey'}}>*/}
                     <a href="/email" className='buton' style={{color: 'lightgrey'}}>
                     Send Email
                     </a>
                     {/*</Link>*/}
                </Button>
         </div>
    );
};

export default TouristPage;