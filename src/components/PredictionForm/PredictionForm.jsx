"use client"

import { useState } from "react"
import { Box, Typography, Container, Paper, Stepper, Step, StepLabel, Fade, useTheme, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import InputForm from "../InputForm"
import PredictionResults from "../PredictionResults"

const PredictionForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [predictionData, setPredictionData] = useState(null)
  const navigate = useNavigate()
  const theme = useTheme()

  const handlePredictionResult = async (formData) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch prediction")
      }

      const data = await response.json()
      setPredictionData(data)
      setActiveStep(1)
    } catch (error) {
      console.error("Prediction error:", error)
      alert("Failed to generate prediction. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPredictionData(null)
    setActiveStep(0)
  }

  const steps = ["Enter Parameters", "View Results"]

  return (
    <Container sx={{ my: 8, pt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
          backdropFilter: "blur(10px)",
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
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: theme.palette.text.primary,
          }}
        >
          Groundwater Level Prediction
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Fade in={activeStep === 0} timeout={500}>
            <Box>
              <InputForm onPredictionResult={handlePredictionResult} loading={loading} />
            </Box>
          </Fade>
        )}

        {activeStep === 1 && (
          <Fade in={activeStep === 1} timeout={500}>
            <Box>
              <PredictionResults {...predictionData} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{
                    px: 4,
                    py: 1,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: "rgba(33, 150, 243, 0.08)",
                    },
                  }}
                >
                  Make Another Prediction
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Paper>
    </Container>
  )
}

export default PredictionForm
