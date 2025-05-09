"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Box, Typography, Paper, useTheme } from "@mui/material"
import L from "leaflet"

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Component to set the view of the map
function SetViewOnLoad({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

// State coordinates (approximate centers)
const stateCoordinates = {
  Maharashtra: [19.7515, 75.7139],
  Jharkhand: [23.6102, 85.2799],
  Rajasthan: [27.0238, 74.2179],
  Bihar: [25.0961, 85.3131],
  "West Bengal": [22.9868, 87.855],
}

// Location coordinates (approximate)
const locationCoordinates = {
  // Maharashtra
  pune: [18.5204, 73.8567],
  mumbai: [19.076, 72.8777],
  nagpur: [21.1458, 79.0882],
  nashik: [19.9975, 73.7898],
  aurangabad: [19.8762, 75.3433],
  // Jharkhand
  ranchi: [23.3441, 85.3096],
  jamshedpur: [22.8046, 86.2029],
  dhanbad: [23.7957, 86.4304],
  bokaro: [23.6693, 86.1511],
  hazaribagh: [23.9921, 85.3632],
  // Rajasthan
  jaipur: [26.9124, 75.7873],
  jodhpur: [26.2389, 73.0243],
  udaipur: [24.5854, 73.7125],
  kota: [25.2138, 75.8648],
  bikaner: [28.0229, 73.3119],
  // Bihar
  patna: [25.5941, 85.1376],
  gaya: [24.7914, 84.9994],
  muzaffarpur: [26.1197, 85.391],
  bhagalpur: [25.2425, 87.0169],
  darbhanga: [26.1542, 85.8918],
  // West Bengal
  kolkata: [22.5726, 88.3639],
  howrah: [22.5958, 88.2636],
  durgapur: [23.5204, 87.3119],
  asansol: [23.6889, 86.9661],
  siliguri: [26.7271, 88.3953],
}

// Function to get approximate coordinates for a location not in our predefined list
const getApproximateCoordinates = (state, locationName) => {
  // If we have the state coordinates, use them as a fallback
  if (state && stateCoordinates[state]) {
    return stateCoordinates[state]
  }
  // Default to center of India
  return [20.5937, 78.9629]
}

// Generate sample data points for the heatmap
const generateSamplePoints = (center, groundwaterLevel, count = 20) => {
  const points = []
  const baseLevel = groundwaterLevel || 10

  for (let i = 0; i < count; i++) {
    // Random offset from center
    const latOffset = (Math.random() - 0.5) * 0.2
    const lngOffset = (Math.random() - 0.5) * 0.2

    // Random groundwater level (deeper in some areas)
    const distanceFactor = Math.sqrt(Math.pow(latOffset, 2) + Math.pow(lngOffset, 2)) * 50
    const randomFactor = (Math.random() - 0.5) * 2
    const level = baseLevel - distanceFactor + randomFactor

    points.push({
      position: [center[0] + latOffset, center[1] + lngOffset],
      level: level,
    })
  }
  return points
}

const MapVisualization = ({ state, location, groundwaterLevel }) => {
  const theme = useTheme()
  const [position, setPosition] = useState([20.5937, 78.9629]) // Default to India center
  const [dataPoints, setDataPoints] = useState([])

  useEffect(() => {
    // Set position based on location or state
    if (location && locationCoordinates[location]) {
      setPosition(locationCoordinates[location])
    } else if (location && state) {
      // For locations not in our predefined list, use approximate coordinates
      setPosition(getApproximateCoordinates(state, location))
    } else if (state && stateCoordinates[state]) {
      setPosition(stateCoordinates[state])
    }
  }, [state, location])

  useEffect(() => {
    // Generate sample data points when the position or groundwater level changes
    if (position) {
      setDataPoints(generateSamplePoints(position, groundwaterLevel))
    }
  }, [position, groundwaterLevel])

  // Function to get color based on groundwater level
  const getColor = (level) => {
    if (level < 2) return "#1a237e" // Very shallow - dark blue
    if (level < 4) return "#303f9f" // Shallow - blue
    if (level < 6) return "#7986cb" // Medium-shallow - light blue
    if (level < 8) return "#81c784" // Medium - light green
    if (level < 10) return "#fff176" // Medium-deep - yellow
    if (level < 15) return "#ffb74d" // Deep - orange
    return "#e57373" // Very deep - red
  }

  return (
    <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: theme.shape.borderRadius }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Spatial Distribution
      </Typography>
      <Box sx={{ position: "relative", height: "calc(100% - 30px)", width: "100%" }}>
        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "100%", width: "100%", borderRadius: theme.shape.borderRadius }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Main marker for the selected location */}
          <Marker position={position}>
            <Popup>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {location ? location.charAt(0).toUpperCase() + location.slice(1) : "Selected location"}
              </Typography>
              <Typography variant="body2">
                Groundwater level: {groundwaterLevel ? `${groundwaterLevel} mbgl` : "Unknown"}
              </Typography>
            </Popup>
          </Marker>

          {/* Data points with color coding */}
          {dataPoints.map((point, index) => (
            <CircleMarker
              key={index}
              center={point.position}
              radius={8}
              pathOptions={{
                fillColor: getColor(point.level),
                color: "white",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Groundwater Level: {point.level.toFixed(1)} mbgl
                </Typography>
              </Popup>
            </CircleMarker>
          ))}

          <SetViewOnLoad center={position} zoom={10} />
        </MapContainer>

        {/* Legend */}
        <Paper
          elevation={2}
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            zIndex: 1000,
            p: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", mb: 0.5 }}>
            Groundwater Level (mbgl)
          </Typography>
          {[
            { level: "<2m", color: "#1a237e" },
            { level: "2-4m", color: "#303f9f" },
            { level: "4-6m", color: "#7986cb" },
            { level: "6-8m", color: "#81c784" },
            { level: "8-10m", color: "#fff176" },
            { level: "10-15m", color: "#ffb74d" },
            { level: ">15m", color: "#e57373" },
          ].map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <Typography variant="caption">{item.level}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Paper>
  )
}

export default MapVisualization

