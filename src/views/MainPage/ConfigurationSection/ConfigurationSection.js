import {DatePicker, DatePickerInput} from 'carbon-components-react';

const ConfigurationSection = () => {

    return <div>
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
    </div>
}

export default ConfigurationSection;