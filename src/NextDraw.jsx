import { useEffect, useState } from "react";

export default function NextDraw(props) {

    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [concursos, setData] = useState([])

    useEffect(() => {
        fetch("https://loteriascaixa-api.herokuapp.com/api/mega-sena/")
            .then(res => res.json())
            .then(
                (result) => {
                    setLoaded(true)
                    setData(result)
                },
                (error) => {
                    setLoaded(true)
                    setError(error)
                }
            )
    }, [])

    if (error) return <div>(Não foi possível obter as informações)</div>
    else if (!loaded) return <div>Acumulou?</div>
    else {
        return (
            <div>
                <div>
                    <h3>O concurso {concursos[1].concurso}
                        {concursos[1].acumulou ?
                            <strong> acumulou! <br />Concorra a {concursos[0].acumuladaProxConcurso}!</strong>
                            :
                            <h3>{concursos[0].premiacoes[0].vencedores} vencedores!</h3>
                        }
                    </h3>
                </div>
                <h3>Próximo concurso({concursos[0].concurso}): {concursos[0].dataProxConcurso}</h3>
            </div>
        )
    }
}