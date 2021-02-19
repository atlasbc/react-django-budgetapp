import React, {useState, useEffect} from 'react'

export default function Home() {
    const [total, setTotal] = useState(null);

    // View for total
    useEffect(() => {
        fetch('/home-request')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTotal(data["total"]);
        })
        .catch(error => console.log(error))

        
        return () => {
            console.log("effect clean? || Home");
        }
    }, [])    



    return (
        <>
            <div>Total = ${total}</div>
            <div>Income Viz</div>
            <div>Transaction Viz</div>
        </>
    )
}
