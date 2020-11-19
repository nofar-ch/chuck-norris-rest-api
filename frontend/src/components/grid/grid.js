import './styles.css'

const Grid = (props) => {
    
    const {factGrid} = props;
    return ( 
        <div className="grid-container">
            {
                factGrid.map((item, index) => {
                    return <div className="grid-item" key={index}>
                            {item.value}
                            <h4>{item.created_at}</h4></div>
                })
            }
        </div>
    );
}

export default Grid;







