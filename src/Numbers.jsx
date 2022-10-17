export default function Numbers(props) {

    return (
        <div className="numsContainer">
            {
                (props.drawNums).map((el) => 
                    <span className="numeros" key={(props.drawNums).indexOf(el)}> {el} </span>)
            }
        </div>
    )
}