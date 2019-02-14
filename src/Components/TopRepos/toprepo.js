import axios from 'axios'
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react'


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class toprepo extends Component {
    constructor(props){
        super(props)
        this.state={
            data:''
        }
    }
	render() {
		const options = {
			title: {
				text: "top repos"
            },
            axisY: {
				title: "Stars",
				includeZero: true
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
				dataPoints: this.state.data
			}
			]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
    }
    componentDidMount(){
        axios.get('http://localhost:3000/top_repos')
        .then((response)=>{
            console.log(response.data)
            let arr = []
            response.data.map((rep)=>{
                console.log(rep.user_name)
                arr.push({
                    label:rep.repo_name,
                    y:rep.stars
                })
            })
            this.setState({
                data:arr
            })
        })
    }
    


}
export default toprepo