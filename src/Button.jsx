export default function Button(props) {

    return (
        <div>
            <button className="button" onClick={props.draw}> Gerar jogo! </button>
        </div>
    )
}