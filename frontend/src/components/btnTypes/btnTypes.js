import React, {Component} from 'react';
import Random from '../random/random';
import Search from '../search/search';
import './styles.css'

class btnTypes extends Component {
    constructor(props){
        super(props);
        this.state = {btnType: 'random'};
    }

    clickedBtnType = (btnType) => {
        this.setState({btnType: btnType})
    }

    render() {
        const {categories} = this.props;
        return ( 
            <div>
                <div className="btn-group">
                    <button onClick={() => this.clickedBtnType("random")}>Random</button>
                    <button onClick={() => this.clickedBtnType("search")}>Search</button>
                </div>
            
                <form className="container">
                {
                    this.state.btnType === 'random' ?
                        <Random categories={categories} 
                                randomFactFn={(obj) => this.props.getrandomFactFn(obj)}/> 
                        : null
                }
                {
                    this.state.btnType === 'search' ?
                        <Search searchFactFn={(query) => this.props.getSearchFactFn(query)}
                            sortClickedFn={() => this.props.sortByCreatedClickedFn()}/> 
                        : null
                }
                </form>
                </div>            
    );
    }
}
export default btnTypes;