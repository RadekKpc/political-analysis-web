import {DatePicker, DatePickerInput, Checkbox } from 'carbon-components-react';
import {useState, useEffect} from 'react';
const ConfigurationSection = () => {


    const [categories, setCategories] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [supportingStrikeOptions, setSupportingStrikeOptions] = useState([]);
    const [allCheckedParties, setAllCheckedParties] = useState(false);
    const [allCheckedCategories, setAllCheckedCategories] = useState(false);
    const [checkBoxesState, setCheckBoxesState] = useState({});

    const renderCheckBoxes = () => <div>


    </div>

    const wrapCheckBoxSet = (object) => (state) => {
        let obj = {...checkBoxesState};
        obj[object] = state;
        setCheckBoxesState(obj);
        console.log(obj);
    }

    useEffect(() => {
        fetch("/categories")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let obj = {}
            data.categories.forEach( (v,k,i) => obj[k] = false);
            data.political_parties.forEach( (v,k,i) => obj[k] = false);
            setCheckBoxesState(obj);
            setCategories(data.categories);
            setSupportingStrikeOptions(data.supporting_strike_options);
            setPoliticalParties(data.political_parties);
            console.log(checkBoxesState);
        });
    }, []);

    return <div>
        {politicalParties.map(function(party){
            if(party != null){
                return <Checkbox key={party} id={party} labelText={party} checked={allCheckedParties || checkBoxesState[party] } onChange={wrapCheckBoxSet(party)} />;
            }
            return null;
        })}
        {categories.map(function(category){
            if(category != null){
                return <Checkbox key={category} id={category} labelText={category} checked={allCheckedCategories || checkBoxesState[category] } onChange={wrapCheckBoxSet(category)} />;
            }
            return null;
        })}


        <Checkbox key="za" id="za" labelText={"za"} checked={allCheckedParties || checkBoxesState["za"] } onChange={wrapCheckBoxSet("za")} />
        <Checkbox key="przeciw" id="przeciw" labelText="przeciw" checked={allCheckedParties || checkBoxesState["przeciw"] } onChange={wrapCheckBoxSet("przeciw")} /> 


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