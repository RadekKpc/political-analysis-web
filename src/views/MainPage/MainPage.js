import styles from './MainPage.module.scss';
import { Button, Column, Row, DatePickerInput,DatePicker } from "carbon-components-react"
import ConfigurationSection from "./ConfigurationSection/ConfigurationSection";
import PlotArea from './PlotArea/PlotArea';
import {useState, useEffect} from 'react';
import { stringify } from 'query-string';

const MainPage = () => {

    const [categories, setCategories] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [supportingStrikeOptions, setSupportingStrikeOptions] = useState([]);
    const [chartType, setChartType] = useState(null);
    const [dateRange, setDataRange] = useState([]);

    const onTagsChange = (categories, parties, supportingStrike, type) => {
        setCategories(categories);
        setPoliticalParties(parties);
        setSupportingStrikeOptions(supportingStrike);
        setChartType(type);
    }

    // narazie obsluguje tylko sumaryczna liczbe twetow dla kategorii, trzeba to zmienic pobierac dane na podstawie zaznaczonych pol i typy wykresu(statstyki)
    // async function handleClick(e) {
    //     var filtered = cats.filter(function (el) {
    //         return el != null;
    //       });
    //     var params = {categories: filtered};

    //     const response = await fetch(`/tweetsCount?${stringify(params)}`)
    //     const res = await response.json();
    //     let ct = res.countTotal.map((x) => x.category);
    //     let counts = res.countTotal.map((x) => x.count);
    //     setCategories(ct);
    //     setCount(counts);
    // }

    return(  
        <Row>
            <Column>
                <ConfigurationSection onTagsChange={onTagsChange}/>
            </Column>
            <Column>
                <PlotArea labels={[...categories, ...politicalParties, ...supportingStrikeOptions]} chartType={chartType}/>
                <div style={{margin: 20}}>
                    <DatePicker datePickerType="range" onChange = {setDataRange} >
                        <DatePickerInput
                            id="date-picker-input-id-start"
                            placeholder="mm/dd/yyyy"
                            labelText="Start date"
                        />
                        <DatePickerInput
                            id="date-picker-input-id-finish"
                            placeholder="mm/dd/yyyy"
                            labelText="End date"
                        />
                    </DatePicker>
                </div>
            </Column>
        </Row>
    );

}

export default MainPage;