import React, {Component} from 'react';
import Head from '../head/head';
import BtnTypes from '../btnTypes/btnTypes';
import Grid from '../grid/grid';
import Api from '../../api';
import './styles.css'

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {categories: null, fact: null, showFact: false, 
                        factGrid: [], showGrid: false, error: false, msg: ""};
    }

    componentDidMount = () => {
        Api.get('http://localhost:4000/categories')
        .then(data => this.setState({categories: data}));
    }

    getJokeByNameAndCategory = (obj) => {
        Api.get(`http://localhost:4000/randomfact/${obj.name}/${obj.cat}`)
            .then(data => {
                this.setState({fact: data.value, showFact: true, 
                                showGrid: false, error: false})
            });
    }

    getJokeByName = (obj) => {
        Api.get(`http://localhost:4000/randomfactname/${obj.name}`)
        .then(data => {
            this.setState({fact: data.value, showFact: true, 
                            showGrid: false, error: false})
        });
    }

    getJokeByCategory = (obj) => {
        Api.get(`http://localhost:4000/randomfactcat/${obj.cat}`)
        .then(data => {
            this.setState({fact: data.value, showFact: true, 
                            showGrid: false, error: false})
        });
    }

    getrandomFact = (obj) => {
        //name & category
        if(obj.name !== "" && obj.cat.length > 0) {
            this.getJokeByNameAndCategory(obj);
        }
        // just name
        else if(obj.name !== "" && obj.cat.length <= 0) {
            this.getJokeByName(obj);
        }
        // just category
        else if(obj.name === "" && obj.cat.length > 0) {
            this.getJokeByCategory(obj)
        }
        // no input
        else 
            this.setState({error: true, msg: "empty input"})
    }


    getSearchFact = (query) => {
        // no input
        if(query === "") {
            this.setState({error: true, msg: "empty query", showGrid: false})
        }
        else {
            Api.get(`http://localhost:4000/searchFact/${query}`)
            .then(data => {
                this.setState({factGrid: data.result, showGrid: true, 
                                showFact:false, error: false})
            });
        }
    }

    sortByCreatedClicked = () => {
        if(this.state.showGrid === true) {
            let factList = this.state.factGrid;
            const sortByCreated = factList.sort((a,b) => this.compareByCreated(a,b));
            this.setState({factGrid: sortByCreated});
        }
        else {
             this.setState({error: true, msg: "empty fact"})
        }
    }

    compareByCreated(a, b) {
       return (new Date(b.created_at) - new Date(a.created_at));
    }
      
    render() {
        if(this.state.categories != null) {
            return ( 
                <div>
                    <Head/>
                    <BtnTypes categories={this.state.categories} 
                            getrandomFactFn={(obj) => this.getrandomFact(obj)}
                            getSearchFactFn={(query) => this.getSearchFact(query)}
                            sortByCreatedClickedFn={() => this.sortByCreatedClicked()}/>
                    
                    {
                        !this.state.error && this.state.showFact === true ?
                            <h3 class="frame">{this.state.fact}</h3> 
                            : null
                    }
                    {
                        !this.state.error && this.state.showGrid === true ?
                            <Grid factGrid={this.state.factGrid}/>
                            : null
                    }
                    {
                        this.state.error ?
                            <div className="error">{this.state.msg}</div>
                            : null
                    }
                </div>
            );
    }
    else
        return <h2>Loading...</h2>
    }
}

export default Dashboard;