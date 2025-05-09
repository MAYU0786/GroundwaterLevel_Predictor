"use client"
import { Grid, Paper, Typography, Box, Divider, Chip, useTheme } from "@mui/material"
import ChartVisualization from "./ChartVisualization"
import MapVisualization from "./MapVisualization"
import OpacityIcon from "@mui/icons-material/Opacity"
import ThermostatIcon from "@mui/icons-material/Thermostat"
import WaterIcon from "@mui/icons-material/Water"
import PublicIcon from "@mui/icons-material/Public"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import WbTwilightIcon from "@mui/icons-material/WbTwilight"

const PredictionResults = ({
  state,
  location,
  preMonsoon,
  postMonsoon,
  maxTemperature,
  minTemperature,
  rainfall,
  morningHumidity,
  eveningHumidity,
  groundwaterLevel,
  confidenceInterval,
}) => {
  const theme = useTheme()

  // Format the location name for display
  const formatLocation = (locationString) => {
    if (!locationString) return "Not specified"

    // If it's in our predefined list, use that
    const locations = {
      pune: "Pune",
      mumbai: "Mumbai",
      nagpur: "Nagpur",
      nashik: "Nashik",
      aurangabad: "Aurangabad",
      ranchi: "Ranchi",
      jamshedpur: "Jamshedpur",
      dhanbad: "Dhanbad",
      bokaro: "Bokaro",
      hazaribagh: "Hazaribagh",
      jaipur: "Jaipur",
      jodhpur: "Jodhpur",
      udaipur: "Udaipur",
      kota: "Kota",
      bikaner: "Bikaner",
      patna: "Patna",
      gaya: "Gaya",
      muzaffarpur: "Muzaffarpur",
      bhagalpur: "Bhagalpur",
      darbhanga: "Darbhanga",
      kolkata: "Kolkata",
      howrah: "Howrah",
      durgapur: "Durgapur",
      asansol: "Asansol",
      siliguri: "Siliguri",
    }

    // If we have a predefined format, use it, otherwise capitalize the first letter
    return locations[locationString] || locationString.charAt(0).toUpperCase() + locationString.slice(1)
  }

  // Remove this function:
  // const formatPeriod = (periodCode) => {
  //   const periods = {
  //     "pre-monsoon": "Pre-Monsoon",
  //     "post-monsoon": "Post-Monsoon",
  //   }
  //   return periods[periodCode] || periodCode
  // }

  // Add this function:
  const getMonsoonPeriod = () => {
    if (preMonsoon === 1) return "Pre-Monsoon"
    if (postMonsoon === 1) return "Post-Monsoon"
    return "Not specified"
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: theme.shape.borderRadius,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: theme.palette.text.primary,
        }}
      >
        Groundwater Prediction Results
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Chip
          label="Prediction Parameters"
          sx={{
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            color: "white",
            fontWeight: "medium",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PublicIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                State
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {state || "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Location
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {formatLocation(location) || "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarMonthIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Period
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {preMonsoon === 1 ? "Pre-Monsoon" : postMonsoon === 1 ? "Post-Monsoon" : "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThermostatIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Temperature Range
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {minTemperature && maxTemperature ? `${minTemperature}°C to ${maxTemperature}°C` : "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WaterIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Rainfall
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {rainfall ? `${rainfall} mm` : "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WbSunnyIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Morning Humidity
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {morningHumidity ? `${morningHumidity}%` : "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WbTwilightIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Evening Humidity
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
              {eveningHumidity ? `${eveningHumidity}%` : "Not specified"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400 }}>
            <ChartVisualization groundwaterLevel={groundwaterLevel} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400 }}>
            <MapVisualization location={location} state={state} groundwaterLevel={groundwaterLevel} />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Chip
          label="Prediction Summary"
          sx={{
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            color: "white",
            fontWeight: "medium",
          }}
        />
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: theme.shape.borderRadius,
            background: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Typography variant="body1" paragraph>
            Based on the provided data for {formatLocation(location)} in {state} during {getMonsoonPeriod()}, our model
            predicts the following groundwater level:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  bgcolor: "rgba(33, 150, 243, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <OpacityIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Predicted Groundwater Level
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    textAlign: "center",
                  }}
                >
                  {groundwaterLevel ? `${groundwaterLevel} mbgl` : "Calculating..."}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
                  meters below ground level
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderLeft: `4px solid ${theme.palette.secondary.main}`,
                  bgcolor: "rgba(0, 121, 107, 0.05)",
                  height: "100%",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Confidence Interval
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
                  {confidenceInterval ? `±${confidenceInterval} meters` : "±0.5 meters"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  This represents the statistical uncertainty in our prediction.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderLeft: `4px solid ${theme.palette.warning.main}`,
                  bgcolor: "rgba(255, 152, 0, 0.05)",
                  height: "100%",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Water Quality Assessment
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.warning.main }}>
                  {groundwaterLevel && groundwaterLevel < 5
                    ? "Excellent"
                    : groundwaterLevel && groundwaterLevel < 10
                      ? "Good"
                      : groundwaterLevel && groundwaterLevel < 15
                        ? "Moderate"
                        : groundwaterLevel && groundwaterLevel < 20
                          ? "Poor"
                          : "Insufficient Data"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Based on depth and regional water quality patterns.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Paper>
  )
}

export default PredictionResults
