import { Checkbox, Column, Row, Dropdown} from 'carbon-components-react';
import {useState, useEffect} from 'react';
import { importantEventsWithLabel } from '../../../services/Events'

function ConfigurationSection({onTagsChange}) {

    const [categories, setCategories] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [allCheckedParties, setAllCheckedParties] = useState(false);
    const [allCheckedCategories, setAllCheckedCategories] = useState(false);
    const [checkBoxesState, setCheckBoxesState] = useState({za: false, przeciw: false});
    const [chartType, setChartType] = useState('TotalTweetsCount');
    const [za, setZa] = useState(false);
    const [przeciw, setPrzeciw] = useState(false);
    const [importantEvents, setImportantEvents] = useState(
        {
            "1" : false,
            "2" : false,
            "3" : false,
            "4" : false,
            "5" : false,
            "6" : false,
            "7" : false,
            "8" : false,
            "9" : false,
            "10" : false,
            "11" : false,
            "12" : false,
            "13" : false,
            "14" : false,
            "15" : false,
            "16" : false,
        }
    );

    const addImportantEvent = (id, value) => {
        let tmp = importantEvents;
        tmp[id.toString()] = value;
        setImportantEvents({...tmp});
    }

    const items = [
        {
            id: 'TotalTweetsCount',
            text: 'Total count of tweets',
        },
        {
            id: 'TotalLikesCount',
            text: 'Total count of tweets\' likes'
        },
        {
            id: 'TotalRetweetsCount',
            text: 'Total count of retweets'
        },
        {
            id: 'TimeTweetsCount',
            text: 'Count of tweets per day'
        },
        {
            id: 'TimeLikesCount',
            text: 'Count of likes per day'
        },
        {
            id: 'TimeRetweetsCount',
            text: 'Count of retweets per day'
        },
        {
            id: 'WordCloud',
            text: 'Word cloud for category'
        },
        {
            id: 'WordCloudHashtags',
            text: 'Word cloud (hashtags) for category'
        }
      ];

    const setAllCategories = (state) => {
        let obj = {...checkBoxesState}
        categories.forEach( (v,k,i) => obj[v] = state);
        setCheckBoxesState(obj);
        setAllCheckedCategories(state);
    }

    const setAllPartes = (state) => {
        let obj = {...checkBoxesState}
        politicalParties.forEach( (v,k,i) => obj[v] = state);
        setCheckBoxesState(obj);
        setAllCheckedParties(state);
    }

    const wrapCheckBoxSet = (object) => (settAll) => (state) => {
        if(!state)settAll(false);
        let obj = {...checkBoxesState, za, przeciw};
        obj[object] = state;
        setCheckBoxesState(obj);
    }

    useEffect(() => {
        let supportingStrike = [];
        if(za)supportingStrike.push('za');
        if(przeciw)supportingStrike.push('przeciw');
        onTagsChange(categories.filter(cat => checkBoxesState[cat] && cat != null), politicalParties.filter(part => checkBoxesState[part] && part != null), supportingStrike, chartType, importantEvents);
     // eslint-disable-next-line
    },[checkBoxesState, za, przeciw, chartType, importantEvents])

    useEffect(() => {
        fetch("/categories")
        .then((res) => res.json())
        .then((data) => {
            let obj = {}
            data.categories.forEach( (v,k,i) => obj[v] = false);
            data.political_parties.forEach( (v,k,i) => obj[v] = false);
            setCheckBoxesState(obj);
            setCategories(data.categories);
            setPoliticalParties(data.political_parties);
        });
    }, []);

    return <div style={{ padding: 20 }}>
        <Row>
        <Column >
        <Checkbox key={"all_parties"} id={"all_parties"} labelText={"Parties"} checked={allCheckedParties} onChange={setAllPartes} />
        <br />
        {politicalParties.map(function(party){
            if(party != null){
                return <Checkbox key={party} id={party} labelText={party} checked={ checkBoxesState[party] } onChange={wrapCheckBoxSet(party)(setAllCheckedParties)} />;
            }
            return null;
        })}
        <br />
        </Column>
        <Column >
        <Checkbox key={"all_categories"} id={"all_categories"} labelText={"Categories"} checked={allCheckedCategories } onChange={setAllCategories} />
        <br />
        {categories.map(function(category){
            if(category != null){
                return <Checkbox key={category} id={category} labelText={category} checked={ checkBoxesState[category] } onChange={wrapCheckBoxSet(category)(setAllCheckedCategories)} />;
            }
            return null;
        })}
        </Column>
        <Column>
        <Checkbox key="za" id="za" labelText="za" checked={ za } onChange={setZa} />
        <Checkbox key="przeciw" id="przeciw" labelText="przeciw" checked={ przeciw } onChange={setPrzeciw} /> 
        </Column>
        <Column>
        {importantEventsWithLabel.filter((e,i) => i<10).map(e => {
            return <Checkbox key={e.id} id={e.id.toString()} labelText={e.name} disabled={chartType.includes("Time") ? false : true}  checked={ importantEvents[e.id.toString()] } onChange={(event) => addImportantEvent(e.id,event)} />
        })
        }
        </Column>
        <Column>
        {importantEventsWithLabel.filter((e,i) => i>=10).map(e => {
            return <Checkbox key={e.id} id={e.id.toString()} labelText={e.name} disabled={chartType.includes("Time") ? false : true}  checked={ importantEvents[e.id.toString()] } onChange={(event) => addImportantEvent(e.id,event)} />
        })
        }
        </Column>
        </Row>
        <Row>
            <Column>
            <div style={{ width: 400 }}>
                <Dropdown
                id="plot"
                titleText="Select char type"
                label = "Char Type"
                items={items}
                itemToString={(item) => (item ? item.text : '')}
                onChange={(event) => setChartType(event.selectedItem.id)}
                />
            </div>
            </Column>
        </Row>
    </div>
}

export default ConfigurationSection;