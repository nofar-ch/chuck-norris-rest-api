import React, {Component} from 'react';
import './styles.css'

class Random extends Component {

    constructor(props){
        super(props);
        this.state = {name: "", expended: false, categoriesSelected: []};
    }

    typing = (e) => {
        this.setState({name: e.target.value});
    }

    categorySelected = (e, cat) => {
        //add category
        if(e.target.checked === true) {
            let addCategory = this.state.categoriesSelected;
            addCategory.push(cat);
            this.setState({categoriesSelected: addCategory});
        }
        //remove category
        else {
            let categories = this.state.categoriesSelected;
            const removeCategory = categories.filter(element => element !== cat);
            this.setState({categoriesSelected: removeCategory});
        }
    }

    goClicked = (e) => {
        e.preventDefault();
        this.setState({expanded: true}, () => this.showCheckboxes());
        const obj = {
            name: this.state.name,
            cat: this.state.categoriesSelected.toString()
        }
        this.props.randomFactFn(obj);
    }

    showCheckboxes = () => {
          let checkboxes = document.getElementById("checkboxes");
          if (!this.state.expanded) {
              checkboxes.style.display = "block";
              this.setState({expanded: true});
          } 
          else {
              checkboxes.style.display = "none";
              this.setState({expanded: false});
          }
        }

render() {
    const  {categories} = this.props;
    return (<div>
            <div id="left">
                <label className="label" htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" onChange={(e) => this.typing(e)}
                    placeholder="e.g Chuck Norris" required/>
            </div>
            <div id="middle">
                <label className="selectLabel" htmlFor="category" >Category</label>
    
                <div className="multiselect">
                    <div className="selectBox" onClick={() => this.showCheckboxes()}>
                        <select name="category">
                            <option>Pick a category</option>
                        </select>
                        <div className="overSelect"></div>
                    </div>
                    <div id="checkboxes">
                    {
                        categories.map((item, index) => {
                            return <label htmlFor={index} key={index}>
                                        <input type="checkbox" id={index} onClick={(e) => this.categorySelected(e, item)}/>
                                        {item}
                                    </label>
                        })
                    }
                    </div>
                </div>
            </div>
            <div id="right">
                <input id="goBtn" type="submit" value="GO!" onClick={(e) => this.goClicked(e)}/>
            </div>
        </div>)
} 
}
export default Random;