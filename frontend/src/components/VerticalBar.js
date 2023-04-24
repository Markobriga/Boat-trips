import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const VerticalBar = ({trips}) => {

    const options = {
        maintainAspectRatio : false,
        plugins: {
          title: {
            display: true,
            text: 'Reservations per trips',
          },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 200,
                grid: {
                    display: false
                }
            }
        }
      };

    
    const labels = trips.map((trip)=> format(new Date(trip.date), 'dd.MM.yyyy'))

    const data = {
        labels,
        datasets: [
            {
                label: 'Number of reservations',
                data: trips.map((trip) => trip.numberOfReservations),
                backgroundColor: '#1d4ed8'
            }
        ]
    }
    

    return (
        <Bar options={options} data={data} />
    )
}

export default VerticalBar