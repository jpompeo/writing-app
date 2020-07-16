import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['Monday', 'Tuesday', 'Wednesday',
           'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Word Count',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10000, 8500, 7000, 5500, 4000, 2500, 1000, 0 ]
    },
    {
      label: 'Daily goal',
      backgroundColor: 'rgba(0,100,100,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10000, 8500, 7000, 5500, 4000, 2500, 1000, 0 ]
    }
  ]
}

export default class BurnDownChart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Word Count weekly goal (July)',
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