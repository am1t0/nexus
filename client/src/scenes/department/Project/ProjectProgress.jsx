import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ProjectProgress() {
  const [progress, setProgress] = useState(60); // Progress percentage

  const data = {
    labels: ["Completed", "In Progress", "Upcoming"],
    datasets: [
      {
        data: [1, 1, 1], // Example data, replace with actual values
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 10 
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
      layout: {
        padding: {
          right: 0, // Adjust right padding if necessary
        }
      }
    },
  };

  // Simulate progress update
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 60) {
          clearInterval(timer);
          return 60;
        }
        return prevProgress + 10;
      });
    });
    return () => clearInterval(timer);
  }, []);

  // Data for the progress chart
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Project Progress (%)",
        data: [20, 10, 40, 30, 60, 70, 36, 80, 100, 90, 70, 100],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart layout
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Project Progress Over this Year",
      },
    },
  };

  return (
    <div className="container py-5">
      {/* Overall Project Progress */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Project Progress</h2>
          <div className="progress mb-4">
            <div
              className="progress-bar progress-bar-striped bg-info"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Milestones Section */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title mb-4">Milestones</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Data Exchange System Developed - Completed
                </li>
                <li className="list-group-item">
                  Data Analytics and Reporting Module - Completed
                </li>
                <li className="list-group-item">
                  Task Scheduling and Reporting System - In Progress
                </li>
                <li className="list-group-item">
                  Mobile Responsiveness and Cross-Browser Compatibility - In
                  Progress
                </li>
                <li className="list-group-item">
                  Performance Optimization and Load Testing - In Progress
                </li>
                <li className="list-group-item">
                  Unified Phasing Tool - Upcoming
                </li>
                <li className="list-group-item">
                  User Interface Enhancement - Upcoming
                </li>
                <li className="list-group-item">
                  Deployment and Cloud Configuration - Upcoming
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Chart Section */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title mb-4">Progress Chart</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Task Breakdown */}

      <div className="container mt-4">
        <div className="row">
          {/* Pie Chart Section */}
          <div className="col-md-4 ">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Task Distribution</h3>
              <div className="w-full" style={{ height: "300px" }}>
                <Pie data={data} options={options} />
              </div>
            </div>
          </div>
          {/* Task Breakdown Section */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-4">Task Breakdown</h3>
                <div className="mb-4">
                  <p className="font-medium">Task 1: Data Sharing Setup</p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      100%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-medium">Task 2: Scheduling System</p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      40%
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Task 3: Unified Phasing</p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "10%" }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      10%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
