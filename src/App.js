import Titulo from "./Titulo"
import Generator from "./Generator"
import DateTime from "./DateTime"
import NextDraw from "./NextDraw"
import "./App.css"

// components in use require an export statement (blank component -> error).
// apparently css attribute do not work in component tags, e.g. <Titulo className="titulo"/>

export default function App(props) {
    return (
        <div className="main">
            <div className="compDiv">
                <Titulo></Titulo>
            </div>
            <div className="compDiv">
                <Generator></Generator>
            </div>
            <div className="compDiv">
                <NextDraw></NextDraw>
            </div>
            <div className="compDiv">
                <DateTime></DateTime>
            </div>
        </div>
    )
}
