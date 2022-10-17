import { useEffect, useState } from "react"

export default function DateTime(props) {

    // const time = new Date() NOT HERE!!! ***
    
    const [clock, setClock] = useState('')
    const [date, setDate] = useState('')
    
    function setClockDate() {
        // *** HERE!!! the freaking class needs to be reinstantiated everytime!!! (why tho??)
        const time = new Date()
        let hh = time.getHours()
        let mm = time.getMinutes()
        let ss = time.getSeconds()
    
        hh = hh < 10 ? '0'+ hh : hh
        mm = mm < 10 ? '0'+ mm : mm
        ss = ss < 10 ? '0'+ ss : ss
    
        let d = time.getDate()    // there's getDay, but it's a number from 0 to 6.s
        let m = time.getMonth()+1 // quirky JS dumb shit. 
        let y = time.getFullYear()
        
        d = d < 10 ? '0'+ d : d
        m = m < 10 ? '0'+ m : m
    
        setClock(`${hh}:${mm}:${ss}`)
        setDate(`${d}/${m}/${y}`)
    
        setTimeout(() => { setClockDate() }, 1000);
    }
    
    useEffect(() => setClockDate())
    
    return(
            <div className="clockDate">
                <div>{clock}</div>
                <div>{date}</div>
            </div>
        )
}


