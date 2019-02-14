import React, { Component } from 'react';

import Header from '../Header/Header'
import DashBoard from './DashBoard/DashBoard'



class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <DashBoard/>
                </div>
        )
    }
}

export default Home