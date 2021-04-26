import styles from './MainPage.module.scss';
import { Button, Column, Row, DatePickerInput,DatePicker } from "carbon-components-react"
import ConfigurationSection from "./ConfigurationSection/ConfigurationSection";
import PlotArea from './PlotArea/PlotArea';
import {useState, useEffect} from 'react';
import { stringify } from 'query-string';

const MainPage = () => {

    const [categories, setCategories] = useState([]);
    const [count, setCount]= useState([]);
    const [chartType, setChartType] = useState(null);
    const [cats, setCats] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [supportingStrikeOptions, setSupportingStrikeOptions] = useState([]);


    const onTagsChange = (categories, parties, supportingStrike, type) => {
        setCats(categories);
        setPoliticalParties(parties);
        setSupportingStrikeOptions(supportingStrike);
        setChartType(type);
        console.log(categories, parties, supportingStrike, type);
    }

    // narazie obsluguje tylko sumaryczna liczbe twetow dla kategorii, trzeba to zmienic pobierac dane na podstawie zaznaczonych pol i typy wykresu(statstyki)
    async function handleClick(e) {
        var filtered = cats.filter(function (el) {
            return el != null;
          });
        var params = {categories: filtered};

        const response = await fetch(`/tweetsCount?${stringify(params)}`)
        const res = await response.json();
        let ct = res.countTotal.map((x) => x.category);
        let counts = res.countTotal.map((x) => x.count);
        setCategories(ct);
        setCount(counts);
    }

    return(  
        <Row>
            <Column>
                <ConfigurationSection onTagsChange={onTagsChange}/>
            </Column>
            <Column>
                <PlotArea labels={categories} values={count} chartType={"Bar"}/>
                <Button onClick={handleClick}>Draw Chart </Button>
                <DatePicker datePickerType="range">
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
            </Column>
        </Row>
    );

}

export default MainPage;