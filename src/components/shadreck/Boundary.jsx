import { Component } from 'react';
export default class Boundary extends Component{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<div dangerouslySetInnerHTML={{__html:this.props.fallback}}/>:this.props.children;}
}
