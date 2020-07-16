import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Monday', 'Tuesday', 'Wednesday',
           'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Word Count',
      fill: true,
      lineTension: 0.5,
      // backgroundColor: 'rgba(75,192,192,1)',
      backgroundColor: ['rgba(75,192,192,1)', 'rgba(75,192,192,1)', 'rgba(75,192,192,1)', 'rgba(75,192,192,1)', 'rgba(75,192,192,1)', 'rgba(75,192,192,1)', 'rgba(75,192,192,1)'],
      borderColor: 'rgba(255,255,255,1)',
      borderWidth: 2,
      data: [1500, 500, 3000, 1000, 2000, 400, ]
    }
  ]
}

export default class WeeklyDoughnut extends React.Component {
  render() {
    return (
      <div>
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Weekly Goal',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
