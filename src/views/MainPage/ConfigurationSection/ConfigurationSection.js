import {DatePicker, DatePickerInput, Checkbox } from 'carbon-components-react';
import {useState, useEffect} from 'react';
function ConfigurationSection({onTagsChange}) {

    const [categories, setCategories] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [supportingStrikeOptions, setSupportingStrikeOptions] = useState([]);
    const [allCheckedParties, setAllCheckedParties] = useState(false);
    const [allCheckedCategories, setAllCheckedCategories] = useState(false);
    const [checkBoxesState, setCheckBoxesState] = useState({za: false, przeciw: false});
    const [chartType, setChartType] = useState(null);

    const wrapCheckBoxSet = (object) => (settAll) => (state) => {
        console.log(state);
        if(!state)settAll(false);
        let obj = {...checkBoxesState};
        obj[object] = state;
        setCheckBoxesState(obj);
        console.log(obj);
        onTagsChange(categories.filter(cat => checkBoxesState[cat]), politicalParties.filter(part => checkBoxesState[part]), supportingStrikeOptions, chartType);
    }

    useEffect(() => {
        fetch("/categories")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let obj = {...checkBoxesState}
            data.categories.forEach( (v,k,i) => obj[v] = false);
            data.political_parties.forEach( (v,k,i) => obj[v] = false);
            setCheckBoxesState(obj);
            setCategories(data.categories);
            setSupportingStrikeOptions(data.supporting_strike_options);
            setPoliticalParties(data.political_parties);
            setChartType("Bar");
            console.log(checkBoxesState);
        });
    }, []);

    return <div>
        
        <Checkbox key={"all_parties"} id={"all_parties"} labelText={"Parties"} checked={allCheckedParties} onChange={setAllCheckedParties} />
        <br />
        {politicalParties.map(function(party){
            if(party != null){
                return <Checkbox key={party} id={party} labelText={party} checked={allCheckedParties || checkBoxesState[party] } onChange={wrapCheckBoxSet(party)(setAllCheckedParties)} />;
            }
            return null;
        })}
        <br />

        <Checkbox key={"all_categories"} id={"all_categories"} labelText={"Categories"} checked={allCheckedCategories } onChange={setAllCheckedCategories} />
        <br />
        {categories.map(function(category){
            if(category != null){
                return <Checkbox key={category} id={category} labelText={category} checked={allCheckedCategories || checkBoxesState[category] } onChange={wrapCheckBoxSet(category)(setAllCheckedCategories)} />;
            }
            return null;
        })}


        <Checkbox key="za" id="za" labelText={"za"} checked={ checkBoxesState["za"] } onChange={wrapCheckBoxSet("za")} />
        <Checkbox key="przeciw" id="przeciw" labelText="przeciw" checked={ checkBoxesState["przeciw"] } onChange={wrapCheckBoxSet("przeciw")} /> 

    </div>
}

export default ConfigurationSection;