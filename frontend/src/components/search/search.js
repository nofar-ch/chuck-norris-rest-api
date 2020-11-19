import React, {Component} from 'react';
import './styles.css'

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {query: ""};
    }

    typing = (e) => {
        this.setState({query: e.target.value});
    }

    goClicked = (e) => {
        e.preventDefault();
        this.props.searchFactFn(this.state.query);
    }

    sortedClicked = (e) => {
        e.preventDefault();
        this.props.sortClickedFn()
    }

render() {
    return (<div>
                <div id="leftText">
                    <label className="label" htmlFor="query">query</label>
                    <input type="text" id="query" name="query"
                        placeholder="e.g music" onChange={(e) => this.typing(e)}/>
                </div>
                <div id="middleBtn">
                    <button id="sortBtn" value="sort by created" onClick={(e) => this.sortedClicked(e)}>
                        sort by created
                        <i className="fa fa-angle-double-down"></i>
                    </button>
            
                </div>
                <div id="rightBtn">
                    <input id="goBtn" type="submit" value="GO!" onClick={(e) => this.goClicked(e)}/>
                </div>
            </div>)
            } 
        }
export default Search;