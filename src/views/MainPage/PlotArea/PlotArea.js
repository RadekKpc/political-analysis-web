import { HorizontalBar, Bar, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import 'chartjs-plugin-annotation';
import { Button } from 'carbon-components-react';
import { getTotalCountForSpecificCategories, getTweetsForDay , getWordCloud, getWordCloudHashtags} from '../../../services/StaticStatisticsService';
import { getBackgroundColor, getBorderColor } from './ColorGenerator';
import { importantEvents } from '../../../services/Events'
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import "zingchart/modules-es6/zingchart-wordcloud.min.js";
import NumericalStatistics from '../../../components/NumericalStatistics/NumericalStatistics';
import CorelationTable from '../../../components/CorelationTable/CorelationTable';


function PlotArea(props) {

  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(false);
  const [impEvents, setImportantEvents] = useState(props.showImportantEvents);
  const [tweetText, setTweetText] = useState(null)

  let days = []
  let start = props.dateRange[0] ? new Date(props.dateRange[0].getTime()) : new Date();
  let end = props.dateRange[1] ? new Date(props.dateRange[1].getTime()) : new Date();
  for (let d = start; d <= end; d.setDate(start.getDate() + 1)) {
    days.push(new Date(d).toISOString().slice(0, 10));

  }
  let filteredImportantEvents = importantEvents.filter((event,index) => days.find(ev => ev === event) && impEvents[index]);
  let mappedImportantEvents = filteredImportantEvents.map(e => [e, days.findIndex(ev => ev === e)])

  const drawPlot = () => {
    setDisplay(true);
    switch (props.chartType) {
      case "TotalTweetsCount":
        getTotalCountForSpecificCategories(props.labels, props.dateRange, setData, "TotalTweetsCount");
        break;
      case "TotalLikesCount":
        getTotalCountForSpecificCategories(props.labels, props.dateRange, setData, "TotalLikesCount");
        break;
      case "TotalRetweetsCount":
        getTotalCountForSpecificCategories(props.labels, props.dateRange, setData, "TotalRetweetsCount");
        break;
      case "TimeTweetsCount":
        getTweetsForDay(props.labels, props.dateRange, setData, "TotalTweetsCount");
        break;
      case "TimeLikesCount":
        getTweetsForDay(props.labels, props.dateRange, setData, "TotalLikesCount");
        break;
      case "TimeRetweetsCount":
        getTweetsForDay(props.labels, props.dateRange, setData, "TotalRetweetsCount");
        break;
      case "WordCloud":
        getWordCloud(props.labels, props.dateRange, setTweetText, "WordCloud");
        break;
      case "WordCloudHashtags":
        getWordCloudHashtags(props.labels, props.dateRange, setTweetText, "WordCloudHashtags");
        break;
      default:
        setData([]);
    }
  }

  useEffect(() => {
    setImportantEvents(props.showImportantEvents)
  }, [data, props.showImportantEvents]);

  const setTimeData = () => {
    return {
      labels: [...days],
      datasets: data ? data.map((set, i) => {
        return {
          label: set[0] ? set[0].category : '',
          data: set[0] ? set.map((e) => { return { x: e.date, y: e.result } }) : [],
          fill: false,
          backgroundColor: getBackgroundColor(i),
          borderColor: getBorderColor(i),
        }
      },
      ) : []
    };
  };

  const setDt = () => {
    return {
      labels: [...props.labels],
      datasets: [
        {
          label: props.chartType,
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',

          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const opt = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };


  const importantEventOptions = {
    responsive: true,
    annotation: {
      drawTime: "afterDraw",
      events: ['click', 'mouseenter', 'mouseleave'],
      annotations:
        mappedImportantEvents ? mappedImportantEvents.map((e) => {
          return {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: e[0],
            borderColor: "red",
            borderWidth: 2,
            hidden: true,
            label: {
              backgroundColor: "black",
              content: e[0],
              enabled: true,
              position: e[1]
            },
          };
        }) : []
    },
  }

  const renderBar = () => {
    let lineOptions = importantEventOptions;
    const key = JSON.stringify(lineOptions);
    if (!display) return <div></div>;
    switch (props.chartType) {
      case "TotalTweetsCount": return <HorizontalBar data={setDt()} options={opt} />
      case "TotalLikesCount": return <HorizontalBar data={setDt()} options={opt} />
      case "TotalRetweetsCount": return <HorizontalBar data={setDt()} options={opt} />
      case "TimeTweetsCount": return <div><Line key={key} data={setTimeData()} options={lineOptions}/><NumericalStatistics data={setTimeData()}/><CorelationTable  data={setTimeData()}/></div>
      case "TimeLikesCount": return <div><Line id="time-chart" key={key} data={setTimeData()} options={lineOptions} /><NumericalStatistics data={setTimeData()}/><CorelationTable data={setTimeData()}/></div>
      case "TimeRetweetsCount": return <div><Line key={key} data={setTimeData()} options={lineOptions}/><NumericalStatistics data={setTimeData()}/><CorelationTable  data={setTimeData()}/></div>
      case "WordCloud": return <ZingChart data={{type: 'wordcloud', options: {text: tweetText, minLength: 4, ignore: ['https', 'była', 'było', 'będą', 'jeśli', 'tych', 'jako', 'więc', 'tego', 'która', 'który', 'które', 'czyli', 'albo', 'jest', 'żeby']}}} />
      case "WordCloudHashtags": return <ZingChart data={{type: 'wordcloud', options: {text: tweetText, minLength: 4}}} />
      default: return <Bar data={setDt()} options={opt} />
    }
  }

  return (
    <div style={{marginLeft: 30}}>
      {renderBar()}
      <Button onClick={drawPlot}>Draw Chart </Button>
    </div>

  );
}

export default PlotArea;