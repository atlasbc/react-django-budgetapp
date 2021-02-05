import React, {useState, useEffect} from 'react'

export default function Income() {
    const [incomeData, setIncomeData] = useState([])

    useEffect(() => {
        fetch('/api/income')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIncomeData(data);
        })
        .catch(error => console.log(error))

        
        return () => {
            console.log("effect clean?");
        }
    }, [])


    const income = incomeData.map(inc => {
        return <li style={{margin: "9px 0"}} key= {inc.id}>{`${inc.name}: $${inc.amount}`}</li>
    })

    return (
        <ul>
            {income}
            <div>Income here!</div>
        </ul>
    )
}
