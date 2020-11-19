import logo from './images/logo.png'
import backgroundLogo from './images/background.jpg'
import './styles.css';


function Head() {
    return ( 
    <div className = "App" >
        <img src={backgroundLogo} id="backgroundLogo" alt="background logo"/>      
        <div id="circle">
            <img src={logo} id="logo" alt="logo chucknorris"/>
        </div>
    </div>   
    );
}

export default Head;