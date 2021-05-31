import styles from './CorelationTable.module.scss';
import { useEffect, useState } from "react";
import { std, mean } from 'mathjs';
const CorelationTable = (props) => {

    const [data, setData] = useState([]);
    const [calculatedData, setCalculatedData] = useState([]);

    const calculaterPearson = (set1, set2) => {
        let cov = mean(set1.map((v,i) => v*set2[i])) - (mean(set1) * mean(set2))
        return (cov/(std(set1)* std(set2))).toString().slice(0,5);
    }

    const mapColor = (value) => {
        if(value >= 0.7) return "#ff6666";
        if(value >= 0.5) return "#ffff99";
        if(value >= 0.3) return "#99ffcc";
        return "#FFFFFF"
    }
    useEffect(() => {
        setData(
            props.data.datasets.map(
                set => {
                    let tmp_zeros = [...props.data.labels.map( e => { return {x: e, y:0}})];
                    let days = set.data.map(d => d.x);
                    console.log({
                        name: set.label,
                        values: [...tmp_zeros.filter(e => !days.includes(e.x)), ...set.data].sort((a,b) => a.x > b.x).map(e => e.y)
                    });
                    return {
                        name: set.label,
                        values: [...tmp_zeros.filter(e => !days.includes(e.x)), ...set.data].sort((a,b) => a.x > b.x).map(e => e.y)
                    }
                }
            )
            .filter( e => e.name !== "")
        )
    }, [props.data]);

    useEffect(() => {
        let tmp = [...data].map(v => { return {name: v.name, values: [...data.map(e => 0)]};})
        for(let i=0;i< data.length; i++){
            for(let j=0;j< data.length; j++){
                if(i === j){
                    tmp[i].values[j] = "x";
                }else{
                    tmp[i].values[j] = calculaterPearson(data[i].values, data[j].values)
                }

            }
        }
        setCalculatedData(tmp);

    }, [data, setCalculatedData]);

    return  <div style={{width: "80%", margin: 30, }} className={styles.container}>
                <h3>Pearson corelation</h3>
                <div style={{marginTop: 20, marginBottom: 20}}>
                    Legend: <br></br><br></br>
                    <div className={styles.legend} style={{backgroundColor: "#99ffcc"}}></div> - weak corelation <br></br>
                    <div className={styles.legend} style={{backgroundColor: "#ffff99"}}></div> - strong corelation <br></br>
                    <div className={styles.legend} style={{backgroundColor: "#ff6666"}}></div> - very strong corelation <br></br>
                </div>

                <table className={styles.table}>
                    <tr className={styles.tr} style={{height: 30, textAlign: "center",}}>
                    <th> rPerason corelation</th>
                        {calculatedData.map(e => <th>
                            {e.name}
                        </th>)}
                    </tr>
                    {calculatedData.map(e => <tr key={e.name}>
                            <td style={{ textAlign: "center", height: 30, width: (100/(calculatedData.length + 1)).toString() + "%"}}>{e.name}</td>
                            {e.values.map( el => <td style={{ textAlign: "center", height: 30, width: (100/(calculatedData.length + 1)).toString() + "%", backgroundColor: mapColor(el)}}>
                                {el}
                            </td>)}
                        </tr>)}
                </table>
            </div>  

}

export default CorelationTable;
