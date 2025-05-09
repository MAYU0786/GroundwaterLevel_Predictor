"use client"

import { useEffect, useState } from "react"
import { Box, Typography, Button, Container, Fade, Slide } from "@mui/material"
import { useNavigate } from "react-router-dom"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import { useAuth } from "../../context/AuthContext"

const HeroSection = () => {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleGetStarted = () => {
    if (currentUser) {
      navigate("/predict")
    } else {
      navigate("/login")
    }
  }

  return (
    <Box
      sx={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
        paddingTop: "64px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundImage: "linear-gradient(to bottom, rgba(33, 150, 243, 0.3), rgba(0, 0, 0, 0.7))",
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={loaded} timeout={1000}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <WaterDropIcon sx={{ fontSize: 40, mr: 1, color: "primary.light" }} />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  background: "linear-gradient(45deg, #64b5f6, #ffffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Groundwater Level Predictor
              </Typography>
            </Box>
          </Box>
        </Fade>

        <Slide direction="up" in={loaded} timeout={1200}>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              lineHeight: 1.6,
            }}
          >
            Analyze and predict groundwater levels with precision. Empower your water resource management decisions with
            advanced AI-driven forecasting technology.
          </Typography>
        </Slide>

        <Fade in={loaded} timeout={1500}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{
              fontSize: "1.2rem",
              py: 1.5,
              px: 4,
              borderRadius: 50,
              background: "linear-gradient(45deg, #2196f3, #00796b)",
              boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976d2, #004d40)",
                boxShadow: "0 6px 25px rgba(33, 150, 243, 0.6)",
              },
            }}
            startIcon={<WaterDropIcon />}
          >
            {currentUser ? "Go to Prediction" : "Get Started"}
          </Button>
        </Fade>
      </Container>
    </Box>
  )
}

export default HeroSection

