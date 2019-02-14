import React, { Component } from 'react';


class packagecard extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <div>
                <p>{this.props.key}:{this.props.value}</p>
            </div>
        )
    }
}