import React, { Component } from 'react';
import axios from 'axios'
import Repocard from './Repocard/Repocard'

const github_api_url = 'https://api.github.com/search/repositories'

class DashBoard extends Component{

    constructor(){
        super()
        this.state={
            repo_name:'',
            repo_list:''
        }
        this.setName = this.setName.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }
    setName(e){
        this.setState({
            repo_name:e.target.value
        })
    }
    
    handleButton(){
        let repo_name = this.state.repo_name
        axios.get(github_api_url,{
            params:{
                q:repo_name,
                sort:'stars',
                order:'desc'
            }
        })
        .then((response)=>{
            this.setState({
                repo_list:response.data.items
        })
    })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        return(
            <div className="container">
            <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter Repository name" value={this.state.repo_name} onChange={this.setName} aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.handleButton}>Search</button>
            </div>
            </div>
            {this.state.repo_list!==''&&this.state.repo_list.map((repo) => <Repocard data = {repo} json_exists={false}/> )}
            </div>
        )
    }
}



export default DashBoard