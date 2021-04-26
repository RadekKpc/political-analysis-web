import { HorizontalBar, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { PropTypes } from 'carbon-components-react';

function PlotArea(props) {
  const [chartType, setChartType] = useState(props.chartType);
  const [labels, setLabels] = useState(props.labels);
  const [values, setValues] = useState(props.values);

  function setDt(){
    var lb = [... props.labels]
    var vals = [... props.values]
    vals.push(0);
    const data = {
      labels: lb,
      datasets: [
        {
          label: props.chartType,
          data: vals,
          backgroundColor: [
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
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }

  function setOpts(){
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
    return opt;

  } 

  if (chartType === "Bar") {
  return (
      <div>
        <HorizontalBar data={setDt()} options={setOpts()} />
      </div>
    );
  }

  //rozne wykresy w zaleznosci od typy statysyki 

  else {
    return (
      <div>
        <Bar data={setDt()} options={setOpts()} />
      </div>
    );
  }
}

export default PlotArea;