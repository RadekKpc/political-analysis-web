import { max } from "d3-array";
import { std, mode, variance, median, mean } from 'mathjs';
import styles from './NumericalStatistics.module.scss';

const NumericalStatistics = (props) => {

    const roundNumber = (numberString, how) => {
        return numberString.slice(0,numberString.indexOf(".") + 1 + how);
    }

    const wrapStatistic = (data, statistic) => {
        if(data.length === 0) return "-";
        let stringValue = statistic(data).toString();
        return roundNumber(stringValue, 2);
    }

    const mapSetToStatistics =  (dataSet, index) => {
        let color = dataSet.borderColor;
        color = color.replace("0.2", "1");
        let values = dataSet.data.map(e => e.y);
        return <div key={index} style={{display: "inline-block", margin: 10, fontSize: 15}}>
            <div style={{margin: 10}}>
                <div className={styles.colorBlock}style={{backgroundColor: color}}></div> {dataSet.label}
            </div>
            <div>
                <div className={styles.statistic}>
                    Average {wrapStatistic(values, mean)}
                </div>
                <div className={styles.statistic}>
                    Standard deviation {wrapStatistic(values, std)}
                </div>
                <div className={styles.statistic}>
                    The highest value { wrapStatistic(values, max)}
                </div>
                <div className={styles.statistic}>
                    Median { wrapStatistic(values, median)}
                </div>
                <div className={styles.statistic}>
                    Mode { wrapStatistic(values, mode)}
                </div>
                <div className={styles.statistic}>
                    Variance { wrapStatistic(values, variance)}
                </div>
            </div>
        </div>
    };

    return  <div style={{margin: 30}}>
            {props.data.datasets.map( (e,i) => mapSetToStatistics(e,i))}
            </div>  

}

export default NumericalStatistics;
