import React, { Component } from 'react';
import axios from 'axios'
import './repo.css'

class Repocard extends Component{
    constructor(props){
        super(props)
        this.state={
            json_exists:false,
            visited:false,
            color:"blues",
            full_name:this.props.full_name
        }
        this.handleButton = this.handleButton.bind(this);
    }
    handleButton(){
        let pkjson_verify_url = 'https://api.github.com/repos/'+this.props.data.owner.login+'/'+this.props.data.name+'/contents/package.json'
        axios.get(pkjson_verify_url)
        .then((response)=>{
            if(response.data.message === 'Not Found'){
                this.setState({
                    json_exists:true,
                        color:"reds",
                        visited:true
                })
            }
            else{
                this.setState({
                        color:"reds",
                        visited:true
                })
                console.log(response.data)
                let packages = atob(response.data.content)
                let tmp = JSON.parse(packages)
                let json_obj = {
                    user_name:this.props.data.owner.login,
                    repo_name:this.props.data.name,
                    stars:this.props.data.stargazers_count,
                    forks:this.props.data.forks,
                    packages:tmp.devDependencies
                }
                let api_url = 'http://localhost:3000/packages'
                axios.post(api_url,json_obj)
                .then((response)=>{
                    console.log(response)
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        })
        .catch((error)=>{
            console.log("no package")
            this.setState({
                json_exists:true,
                    color:"reds",
                    visited:true
            })
        })
    }


  componentDidUpdate(prevProps){
      if(prevProps.data.name !== this.props.data.name){
          console.log("suraj")
          this.setState({
                json_exists:false
          })
      }
  }
  
    render(){
        return(
            <div className = "card">
               <div className = "card-body">
                    <a href={this.props.data.html_url} id={this.state.color}  onClick={this.handleClick}>{this.props.data.name}({this.props.data.full_name})</a>
                    <p className="card-text">stars :{this.props.data.stargazers_count} forks :{this.props.data.forks}</p>
                    {this.state.json_exists && <p>package.json does not exist</p>}
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.handleButton} >import</button>
                </div>
            </div>
        )
    }
}


export default Repocard