import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IncomeTable from './IncomeTable';
import IncomeForm from './IncomeForm';

const useStyles = makeStyles(() => ({
    header: {
        textAlign: "center",
    },
  }));


export default function Income() {
    const [incomeData, setIncomeData] = useState([])
    
    const classes = useStyles();


    return (
        <>
            <div>
                <h2 className={classes.header}>Add New Income</h2>
                <IncomeForm incomeData = {incomeData} setIncomeData = {setIncomeData}/>
            </div>
            <h2 className={classes.header}>Your Income Data</h2>
            <IncomeTable incomeData = {incomeData} setIncomeData = {setIncomeData}/>
        </>
    )
}
