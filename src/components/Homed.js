import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import './Homed.css';  // Import your custom CSS

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Homed = () => {
  const [data, setData] = useState({
    meetingsConducted: 10,
    meetingsMissed: 2,
    totalHours: 25,
    mentorRequests: 5,
    topMentors: ['John Doe', 'Jane Smith', 'Alice Johnson'],
    upcomingMeetings: 3,
    totalMentors: 20,
    monthlyData: {
      conducted: [3, 4, 2, 5, 6, 7, 8, 4, 5, 6, 4, 5], 
      missed: [1, 0, 2, 1, 2, 1, 0, 3, 2, 1, 0, 1], 
      hours: [10, 12, 8, 15, 18, 20, 22, 16, 19, 20, 14, 16], 
    },
  });

  useEffect(() => {
    // This is where you'd fetch data from an API
    // setData with the actual API data
  }, []);

  const pieData = {
    labels: [
      'Meetings Conducted',
      'Meetings Missed',
      'Upcoming Meetings',
      'Meetings Waiting for Approval',
      'Total Hours'
    ],
    datasets: [
      {
        data: [
          data.meetingsConducted,
          data.meetingsMissed,
          data.upcomingMeetings,
          data.mentorRequests, 
          data.totalHours
        ],
        backgroundColor: [
          '#36A2EB',  
          '#FF6384',  
          '#FFCE56',  
          '#4BC0C0',  
          '#9966FF'   
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
      },
    ],
  };

  const barData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Meetings Conducted',
        data: data.monthlyData.conducted,
        backgroundColor: '#36A2EB', 
      },
      {
        label: 'Meetings Missed',
        data: data.monthlyData.missed,
        backgroundColor: '#FF6384', 
      },
      {
        label: 'Total Hours',
        data: data.monthlyData.hours,
        backgroundColor: '#9966FF', 
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Grid container spacing={3} className="dashboard-container">
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ backgroundColor: '#FFC1C1' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Meetings Conducted per month</Typography>
            <Typography variant="h3">{data.meetingsConducted}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ backgroundColor: '#C1FFD7' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Meetings Missed per month</Typography>
            <Typography variant="h3">{data.meetingsMissed}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ backgroundColor: '#FFFAC1' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Total live interaction Hours</Typography>
            <Typography variant="h3">{data.totalHours}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ backgroundColor: '#C1E7FF' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Awaiting Mentor Requests</Typography>
            <Typography variant="h3">{data.mentorRequests}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ backgroundColor: '#E1C1FF' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Upcoming Meetings</Typography>
            <Typography variant="h3">{data.upcomingMeetings}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ backgroundColor: '#FFE1C1' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Total Mentors</Typography>
            <Typography variant="h3">{data.totalMentors}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card style={{ backgroundColor: '#D1FFEB' }}>
          <CardContent className="card-content">
            <Typography variant="h5">Meeting Statistics & Monthly Data</Typography>
            <Grid container spacing={3} className="chart-container">
              <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '400px', height: '400px' }}>
                  <Pie data={pieData} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Bar data={barData} options={barOptions} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Homed;