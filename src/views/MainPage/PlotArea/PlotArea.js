import { HorizontalBar, Bar, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Button } from 'carbon-components-react';
import { getTotalCountForSpecificCategories, getTweetsForDay } from '../../../services/StaticStatisticsService';
import { getBackgroundColor, getBorderColor } from './ColorGenerator';

function PlotArea(props) {

  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(false);

  const drawPlot = () => {
    setDisplay(true);
    switch(props.chartType) {
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
      default: 
        setData([]);
    }
  }

  useEffect(() => {
    console.log("setData", data);
  }, [data]);

  const setTimeData = () => 
  {
    
    let days = []
    let start = props.dateRange[0] ? new Date(props.dateRange[0].getTime()) : new Date();
    let end = props.dateRange[1] ? new Date(props.dateRange[1].getTime()) : new Date();
    while(end.getDate() !== start.getDate() || end.getMonth() !== start.getMonth() || end.getFullYear() !== start.getFullYear() ){
      days.push(start.getUTCDate() + '.0' + start.getMonth());
      start.setDate(start.getDate() + 1);
    }

    console.log("Data", data);
    return  {
      labels: [...days],
      datasets: data ? data.map((set) => {
        return {
          label: set[0] ? set[0].category : '',
          data: set[0] ? set.map((e) => e.result) : [],
          fill: false,
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor()
        }
      } 
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

  const renderBar = () => {
    if(!display) return <div></div>;
    switch(props.chartType) {
      case "TotalTweetsCount": return <HorizontalBar data={setDt()} options={opt} />
      case "TotalLikesCount": return <HorizontalBar data={setDt()} options={opt} />
      case "TotalRetweetsCount": return <HorizontalBar data={setDt()} options={opt} />
      case "TimeTweetsCount": return <Line data={setTimeData()} />
      case "TimeLikesCount": return <Line data={setTimeData()} />
      case "TimeRetweetsCount": return <Line data={setTimeData()} />
      default: return <Bar data={setDt()} options={opt} />
    }
  }

  return (
      <div>
        {renderBar()}
        <Button onClick={drawPlot}>Draw Chart </Button>
      </div>

  );
}

export default PlotArea;