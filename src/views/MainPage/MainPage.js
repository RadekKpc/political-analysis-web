import styles from './MainPage.module.scss';
import { Button, Column, Row, DatePickerInput,DatePicker } from "carbon-components-react"
import ConfigurationSection from "./ConfigurationSection/ConfigurationSection";
import PlotArea from './PlotArea/PlotArea';

const MainPage = () => {

    return(  
        <Row>
            <Column>
                <ConfigurationSection />
            </Column>
            <Column>
                <PlotArea />
                <Button>Draw Chart</Button>
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