"use client"

import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Divider,
  Chip,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Collapse,
  InputAdornment,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ThermostatIcon from "@mui/icons-material/Thermostat"
import WaterIcon from "@mui/icons-material/Water"
import SendIcon from "@mui/icons-material/Send"
import PublicIcon from "@mui/icons-material/Public"
import WbTwilightIcon from "@mui/icons-material/WbTwilight"
import WbSunnyIcon from "@mui/icons-material/WbSunny" // Import WbSunnyIcon

import axios from "axios"

// Sample location data - in a real app, you would fetch this from your backend
const locationsByState = {
  Maharashtra: [
    { value: "pune", label: "Pune" },
    { value: "mumbai", label: "Mumbai" },
    { value: "nagpur", label: "Nagpur" },
    { value: "nashik", label: "Nashik" },
    { value: "aurangabad", label: "Aurangabad" },
  ],
  Jharkhand: [
    { value: "ranchi", label: "Ranchi" },
    { value: "jamshedpur", label: "Jamshedpur" },
    { value: "dhanbad", label: "Dhanbad" },
    { value: "bokaro", label: "Bokaro" },
    { value: "hazaribagh", label: "Hazaribagh" },
  ],
  Rajasthan: [
    { value: "jaipur", label: "Jaipur" },
    { value: "jodhpur", label: "Jodhpur" },
    { value: "udaipur", label: "Udaipur" },
    { value: "kota", label: "Kota" },
    { value: "bikaner", label: "Bikaner" },
  ],
  Bihar: [
    { value: "patna", label: "Patna" },
    { value: "gaya", label: "Gaya" },
    { value: "muzaffarpur", label: "Muzaffarpur" },
    { value: "bhagalpur", label: "Bhagalpur" },
    { value: "darbhanga", label: "Darbhanga" },
  ],
  "West Bengal": [
    { value: "kolkata", label: "Kolkata" },
    { value: "howrah", label: "Howrah" },
    { value: "durgapur", label: "Durgapur" },
    { value: "asansol", label: "Asansol" },
    { value: "siliguri", label: "Siliguri" },
  ],
}

const InputForm = ({ onPredictionResult }) => {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    state: "",
    location: "",
    postMonsoon: 0,
    preMonsoon: 0,
    maxTemperature: "",
    minTemperature: "",
    rainfall: "",
    morningHumidity: "",
    eveningHumidity: "",
  })
  const [locations, setLocations] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Update locations when state changes
  useEffect(() => {
    if (formData.state) {
      setLocations(locationsByState[formData.state] || [])
      // Reset location when state changes
      setFormData((prev) => ({ ...prev, location: "" }))
    }
  }, [formData.state])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleMonsoonToggle = (period) => {
    // Reset both values to 0
    const updatedFormData = {
      ...formData,
      preMonsoon: 0,
      postMonsoon: 0,
    }

    // Set the selected period to 1
    updatedFormData[period] = 1

    setFormData(updatedFormData)

    // Clear monsoon error if it exists
    if (errors.monsoon) {
      setErrors({
        ...errors,
        monsoon: "",
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.state) newErrors.state = "State is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (formData.preMonsoon === 0 && formData.postMonsoon === 0) {
      newErrors.monsoon = "Please select a monsoon period"
    }

    if (!formData.maxTemperature) newErrors.maxTemperature = "Maximum temperature is required"

    if (isNaN(formData.maxTemperature) || formData.maxTemperature < -50 || formData.maxTemperature > 60)
      newErrors.maxTemperature = "Temperature must be between -50°C and 60°C"

    if (!formData.minTemperature) newErrors.minTemperature = "Minimum temperature is required"
    else if (isNaN(formData.minTemperature) || formData.minTemperature < -50 || formData.minTemperature > 60)
      newErrors.minTemperature = "Temperature must be between -50°C and 60°C"

    if (
      formData.minTemperature &&
      formData.maxTemperature &&
      Number.parseFloat(formData.minTemperature) > Number.parseFloat(formData.maxTemperature)
    )
      newErrors.minTemperature = "Minimum temperature cannot be greater than maximum temperature"

    if (!formData.rainfall) newErrors.rainfall = "Rainfall is required"
    else if (isNaN(formData.rainfall) || formData.rainfall < 0 || formData.rainfall > 5000)
      newErrors.rainfall = "Rainfall must be between 0mm and 5000mm"

    if (!formData.morningHumidity) newErrors.morningHumidity = "Morning humidity is required"
    else if (isNaN(formData.morningHumidity) || formData.morningHumidity < 0 || formData.morningHumidity > 100)
      newErrors.morningHumidity = "Humidity must be between 0% and 100%"

    if (!formData.eveningHumidity) newErrors.eveningHumidity = "Evening humidity is required"
    else if (isNaN(formData.eveningHumidity) || formData.eveningHumidity < 0 || formData.eveningHumidity > 100)
      newErrors.eveningHumidity = "Humidity must be between 0% and 100%"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validate()) {
      setLoading(true)
      setError("")
      setSuccess(false)

      // Create the request body in the exact format required by the API
      const requestBody = {
        rainfall: Number(formData.rainfall),
        maxTemperature: Number(formData.maxTemperature),
        minTemperature: Number(formData.minTemperature),
        morningHumidity: Number(formData.morningHumidity),
        eveningHumidity: Number(formData.eveningHumidity),
        postMonsoon: formData.postMonsoon,
        preMonsoon: formData.preMonsoon,
      }

      try {
        // Make API call to your Spring Boot backend with the updated endpoint
        const response = await axios.post("http://localhost:8080/gwl", requestBody)

        // Handle successful response
        console.log("Prediction result in mbgl:", response.data) 
        setSuccess(response.data)

        // Pass the prediction result to the parent component
        if (onPredictionResult) {
          onPredictionResult({
            ...response.data,
            location: formData.location,
            state: formData.state,
            preMonsoon: formData.preMonsoon,
            postMonsoon: formData.postMonsoon,
            maxTemperature: formData.maxTemperature,
            minTemperature: formData.minTemperature,
            rainfall: formData.rainfall,
            morningHumidity: formData.morningHumidity,
            eveningHumidity: formData.eveningHumidity,
          })
        }
      } catch (error) {
        console.error("Error making prediction:", error)
        setError(error.response?.data?.message || "Failed to generate prediction. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: theme.shape.borderRadius,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Enter Prediction Parameters
        </Typography>
        <Divider />
      </Box>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Collapse>

      <Collapse in={success}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Prediction generated successfully!
        </Alert>
      </Collapse>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.state}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  label="State"
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <PublicIcon color="primary" />
                    </InputAdornment>
                  }
                >
                  {Object.keys(locationsByState).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && (
                  <Typography variant="caption" color="error">
                    {errors.state}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.location}
                helperText={errors.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter location name"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Monsoon Period
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant={formData.preMonsoon === 1 ? "contained" : "outlined"}
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => handleMonsoonToggle("preMonsoon")}
                  sx={{
                    flexGrow: 1,
                    borderColor: theme.palette.primary.main,
                    "&.MuiButton-contained": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                  }}
                >
                  Pre-Monsoon
                </Button>
                <Button
                  variant={formData.postMonsoon === 1 ? "contained" : "outlined"}
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => handleMonsoonToggle("postMonsoon")}
                  sx={{
                    flexGrow: 1,
                    borderColor: theme.palette.primary.main,
                    "&.MuiButton-contained": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                  }}
                >
                  Post-Monsoon
                </Button>
              </Box>
              {errors.monsoon && (
                <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>
                  {errors.monsoon}
                </Typography>
              )}
            </Grid>
          </Grid>

          {(formData.preMonsoon === 1 || formData.postMonsoon === 1) && (
            <>
              <Divider>
                <Chip
                  label="Climate Parameters"
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                    color: "white",
                    fontWeight: "medium",
                  }}
                />
              </Divider>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`Average Maximum Temperature (°C)`}
                    type="number"
                    name="maxTemperature"
                    value={formData.maxTemperature}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.maxTemperature}
                    helperText={errors.maxTemperature}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ThermostatIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`Average Minimum Temperature (°C)`}
                    type="number"
                    name="minTemperature"
                    value={formData.minTemperature}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.minTemperature}
                    helperText={errors.minTemperature}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ThermostatIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label={`Average Rainfall (mm)`}
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.rainfall}
                    helperText={errors.rainfall}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WaterIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`Morning Humidity (%)`}
                    type="number"
                    name="morningHumidity"
                    value={formData.morningHumidity}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.morningHumidity}
                    helperText={errors.morningHumidity}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WbSunnyIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`Evening Humidity (%)`}
                    type="number"
                    name="eveningHumidity"
                    value={formData.eveningHumidity}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.eveningHumidity}
                    helperText={errors.eveningHumidity}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WbTwilightIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            disabled={loading}
            sx={{
              mt: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            {loading ? "Generating..." : "Generate Prediction"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}

export default InputForm
