import { Column, Row, DatePickerInput,DatePicker } from "carbon-components-react"
import ConfigurationSection from "./ConfigurationSection/ConfigurationSection";
import PlotArea from './PlotArea/PlotArea';
import {useState} from 'react';

const MainPage = () => {

    const [categories, setCategories] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [supportingStrikeOptions, setSupportingStrikeOptions] = useState([]);
    const [chartType, setChartType] = useState(null);
    const [dateRange, setDataRange] = useState([]);
    const [importantEvents, setImportantEvents] = useState({});

    const onTagsChange = (categories, parties, supportingStrike, type, importantEv) => {
        setCategories(categories);
        setPoliticalParties(parties);
        setSupportingStrikeOptions(supportingStrike);
        setChartType(type);
        setImportantEvents(importantEv);
    }

    return(  
        <Row>
            <Column>
                <ConfigurationSection onTagsChange={onTagsChange}/>
            </Column>
            <Column>
                <PlotArea labels={[...categories, ...politicalParties, ...supportingStrikeOptions]} dateRange={dateRange} chartType={chartType} showImportantEvents={importantEvents}/>
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