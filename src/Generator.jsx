import Numbers from "./Numbers"
import Button from "./Button"
import { useEffect, useState } from "react"

export default function Generator(props) {

    let [error, setError] = useState("")
    let [draws, setData] = useState([])
    let [loaded, setLoaded] = useState(false)
    let [luckyDraw, setLuckyNumbers] = useState([" ", "  ", "   ", "    ", "     ", "      "])
    // in the Numbers component this array is being recruited through a method, to 
    // "know" how many <li>'s to render. If it's empty, there will be no <li>'s.
    // also, equal values ("") point to the same index.


    useEffect(() => {
        fetch("https://loteriascaixa-api.herokuapp.com/api/mega-sena/")
            .then(res => res.json())
            .then(
                result => {
                    setLoaded(true)
                    setData(result)
                },
                error => {
                    setError(error)
                    setLoaded(true)
                }
            )
    }, [])

    // double-digits(check!)
    const luckyNumbers = () => {
        let pass = false
        let nums = []
        while (!pass) {

            // assemble draw
            for (let i = 0; i < 6; i++) {
                let num = Math.floor(Math.random() * 100)

                while (num > 60 | num === 0 | nums.includes(num)) {
                    num = Math.floor(Math.random() * 100)
                }
                if (num > 0 && num < 10) nums.push(num)
                else nums.push(num)
            }

            // DOUBLE DIGIT FORMAT
            // first I tried "return nums[i] = '0'+n", i.e. an assignment, which is probably
            // what was causing the "Expected to return a value in arrow function" warning
            nums.map((n, i) => {
                if (n < 10) nums[i] = '0' + n
                return nums[i]
            })

            // SORT ARRAY
            nums.sort(function func(a, b) { return a - b }) // how to sort array in JS...

            // COMPARE WITH EXISTING RESULTS
            // Two ways of doing it: 
            // 1 - very clean one-liner, but always check the whole array, which in
            // this case is +2500 long and counting;
            // 2 - 3 lines long for-loop, but quits scanning this long array when it should
            
            // extra: CHECK IF STRING COMPARISON REALLY WORKS
            // let existing = []
            // existing.push(nums.toString()) // added on purpose to test string equality(inf. loop)
            // for (let i = 0; i < draws.length; i++) {
            //     existing.push(draws[i].dezenas.toString())
            // }
            // for (let i = 0; i < existing.length; i++) {
            //     if (existing[i] !== nums.toString()) pass = true
            //     else {
            //         console.log(existing[i] === nums.toString())
            //         pass = false
            //         break
            //     }
            // }

            // 1
            // if (draws.every(item => item.dezenas.toString() !== nums.toString())) pass = true

            // 2
            for (let i = 0; i < draws.length; i++) {
                if (draws[i].dezenas.toString() !== nums.toString()) pass = true
                else { pass = false; break }}
        } setLuckyNumbers(nums)
        // 'draw' IS indeed updated, i.e. the draw appears after pressing the
        // button. however, console.log(draw) prints an empty array.
        // (something about 'the asynchronous nature of useState'.
        // source: https://stackoverflow.com/a/72697737/14508690)
    }

    if (!loaded) return <div>Aguarde...</div>
    else if (error) return <div>Ocorreu um erro</div>
    else {
        return (
            <>
                <Button draw={luckyNumbers}></Button>
                <Numbers drawNums={luckyDraw}></Numbers>
            </>
        )
    }

}
