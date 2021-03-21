import { useTheme } from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';


const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const colors = ["#3f51b5","#009688", "#673ab7", "#ff5722"]

export default function Home() {
    const [total, setTotal] = useState(null);
    const [transactionData, setTransactionData] = useState([])
    const theme = useTheme();

    // const dummyData = [
    //     { category: 'Group A', amount: 10000 },
    //     { category: 'Group B', amount: 300 },
    //     { category: 'Group C', amount: 300 },
    //     { category: 'Group D', amount: 200 },
    //   ]; 


      const renderCustomizedLabel = (props) => {
        const {cx, cy, x, y, percent, value, index, name } = props;
      
        return (
            <>
            <text x ={cx > x ? x - 35: x} y={cy < y ? y + 35: y} dy={-20} fill={theme.palette.text.primary} dominantBaseline="central" >
              {name}
            </text>
            <text x ={cx > x ? x - 35: x } y={cy < y ? y + 35: y} fill={theme.palette.text.primary} dominantBaseline="central" >
                {currencyFormatter.format(Number(value))}
            </text>
            </>
        );
      };
    
    const initialValue = 0
    const sum = transactionData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.data_sum
        , initialValue
    )
    //console.log(sum);
    // View for total
    useEffect(() => {
        fetch('/home-request')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            setTotal(data["total"]);
        })
        .catch(error => console.log(error))

        fetch('/api/transactions/categories')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            setTransactionData(data);
        })
        .catch(error => console.log(error))

        return () => {
            //console.log("effect clean? || Home");
        }
    }, [])


    return (
        <div style={{textAlign:"center", width:"100%", height:"100%"}}>
            <h1>Total = {currencyFormatter.format(Number(total))}</h1>
            <h2 >Transaction according to Categories</h2>
            <ResponsiveContainer width={'100%'} height={300} >
                <PieChart margin={{top: 0, right: 30, left: 30, bottom: 0}} >
                    <Pie data={transactionData} dataKey="data_sum" nameKey="category" isAnimationActive={false}
                    cx={"50%"} cy={"50%"} innerRadius="30%" outerRadius="60%" fill={theme.palette.primary.main}
                    label = {renderCustomizedLabel} >
                        <LabelList dataKey="data_sum" formatter={(value) => `${((value/sum)*100).toFixed(2)}%`}
                        fontWeight={theme.typography.fontWeightLight}/>
                        {
                        transactionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))
                        }                        
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
