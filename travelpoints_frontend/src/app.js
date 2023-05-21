import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './home-page/components/home';
import LoginContainer from './login/components/login-container';
import RegisterContainer from './register/components/register-container';
import ResetPasswordContainer from './reset-password/components/reset-password-container';
import TouristContainer from './tourist/components/tourist-container';
import AdminContainer from './admin/components/admin-container';
import CommentContainer from './tourist/components/comment-container';
import ContactUs from './tourist/components/ContactUs';

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import WishboardContainer from "./wishboard/components/wishboard";
import Wish from "./wishboard/components/Wish";
import Comment from "./comments/components/Comment";
import Charts from "./admin/components/Charts";
import PriceCharts from "./admin/components/PriceCharts";

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route

                            path='/login'
                            render={() => <LoginContainer/>}
                        />
                        <Route

                            path='/register'
                            render={() => <RegisterContainer/>}
                        />
                         <Route exact path="/charts" component={Charts} />
                         <Route exact path="/pricecharts" component={PriceCharts} />
                        <Route

                            path='/reset'
                            render={() => <ResetPasswordContainer/>}
                        />

                        <Route

                             path='/touristboard'
                             render={() => <TouristContainer/>}
                        />

                        <Route

                             path='/adminboard'
                             render={() => <AdminContainer/>}
                        />
                         <Route

                             path='/email'
                             render={() => <ContactUs/>}
                         />

                        <Route

                            path='/comment'
                            render={() => <CommentContainer/>}
                        />
                        <Route
                            exact
                            path='/wishboard'
                            render={() => <Wish/>}
                        />
                        <Route
                            exact
                            path='/comments'
                            render={() => <Comment/>}
                        />


                        {/*Error*/}
                        <Route

                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                        <Route path="*" component={()=><Redirect to='/home'/>}/>
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
