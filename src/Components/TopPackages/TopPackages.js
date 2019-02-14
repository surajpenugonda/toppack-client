import React, { Component } from 'react';
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar'
class TopPackages extends Component{
    constructor(props){
        super(props)
        this.state={
            top_packages:''
        }
    }
    componentDidMount(){
        let top_packages_url = 'http://localhost:3000/top_packages'
        axios.get(top_packages_url)
        .then((response)=>{
            this.setState({
                top_packages:response.data
            })
            console.log(this.state.top_packages)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        return(
            <div>
            
            <SearchBar/>
            {this.state.top_packages!==''&& JSON.stringify(this.state.top_packages)   }


            </div>
        )
    }
}

export default TopPackages