"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Box, useTheme, Paper, Typography } from "@mui/material"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const ChartVisualization = ({ groundwaterLevel }) => {
  const theme = useTheme()

  // Generate more realistic data with seasonal patterns
  const generateSeasonalData = (baseLevel) => {
    const baseGroundwaterLevel = baseLevel || 12
    const seasonalAmplitude = 3
    const trendIncrease = 0.2
    const randomNoise = 0.8

    return Array.from({ length: 24 }, (_, i) => {
      // Seasonal component (higher in winter/spring, lower in summer/fall)
      const seasonal = seasonalAmplitude * Math.sin((i / 12) * Math.PI)
      // Trend component (slight increase over time)
      const trend = trendIncrease * i
      // Random noise
      const noise = (Math.random() - 0.5) * randomNoise

      return baseGroundwaterLevel + seasonal + trend + noise
    })
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const actualData = generateSeasonalData(groundwaterLevel)
  const predictedData = [...actualData.slice(0, 12), ...Array(12).fill(null)]
  const forecastData = [...Array(12).fill(null), ...actualData.slice(12)]

  // Generate confidence intervals (upper and lower bounds)
  const upperBound = forecastData.map((val) => (val !== null ? val + 1 : null))
  const lowerBound = forecastData.map((val) => (val !== null ? val - 1 : null))

  const data = {
    labels: months,
    datasets: [
      {
        label: "Historical Data",
        data: predictedData,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
      },
      {
        label: "Forecast",
        data: forecastData,
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        borderDash: [5, 5],
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
      },
      {
        label: "Upper Bound",
        data: upperBound,
        borderColor: "transparent",
        backgroundColor: "transparent",
        pointRadius: 0,
        tension: 0.3,
        fill: "+1",
      },
      {
        label: "Lower Bound",
        data: lowerBound,
        borderColor: "transparent",
        backgroundColor: theme.palette.secondary.light + "40", // 40 = 25% opacity
        pointRadius: 0,
        tension: 0.3,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          filter: (item) => !["Upper Bound", "Lower Bound"].includes(item.text),
        },
      },
      title: {
        display: true,
        text: "Groundwater Level Over Time (mbgl)",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2) + " mbgl"
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: "Groundwater Level (mbgl)",
        },
        grid: {
          color: theme.palette.divider,
        },
        // Invert the y-axis since higher values mean deeper groundwater (worse)
        reverse: true,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.3,
      },
    },
    animation: {
      duration: 2000,
    },
  }

  return (
    <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: theme.shape.borderRadius }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Groundwater Level Forecast
      </Typography>
      <Box sx={{ position: "relative", height: "calc(100% - 30px)", width: "100%" }}>
        <Line data={data} options={options} />
      </Box>
    </Paper>
  )
}

export default ChartVisualization

