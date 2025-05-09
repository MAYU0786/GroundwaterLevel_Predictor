"use client"
import { Box, Typography, Grid, Container, Card, CardContent, Zoom, useTheme } from "@mui/material"
import MapIcon from "@mui/icons-material/Map"
import TimelineIcon from "@mui/icons-material/Timeline"
import TouchAppIcon from "@mui/icons-material/TouchApp"
import BarChartIcon from "@mui/icons-material/BarChart"
import CloudIcon from "@mui/icons-material/Cloud"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"

const features = [
  {
    title: "Spatial Forecasting",
    description:
      "Predict groundwater levels across different regions using advanced spatial data analysis and machine learning algorithms.",
    icon: <MapIcon sx={{ fontSize: 50 }} />,
    delay: 0,
  },
  {
    title: "Temporal Forecasting",
    description:
      "Analyze trends over time with sophisticated temporal forecasting models that account for seasonal variations and long-term patterns.",
    icon: <TimelineIcon sx={{ fontSize: 50 }} />,
    delay: 150,
  },
  {
    title: "User-Friendly Interface",
    description:
      "Accessible to researchers, policymakers, and the general public with intuitive controls and visualizations.",
    icon: <TouchAppIcon sx={{ fontSize: 50 }} />,
    delay: 300,
  },
  {
    title: "Data Visualization",
    description: "Interactive charts and maps to help you understand groundwater trends and make informed decisions.",
    icon: <BarChartIcon sx={{ fontSize: 50 }} />,
    delay: 450,
  },
  {
    title: "Weather Integration",
    description: "Incorporates weather data and climate forecasts to improve prediction accuracy and reliability.",
    icon: <CloudIcon sx={{ fontSize: 50 }} />,
    delay: 600,
  },
  {
    title: "Alert System",
    description: "Set up custom alerts for critical groundwater levels to stay informed about important changes.",
    icon: <NotificationsActiveIcon sx={{ fontSize: 50 }} />,
    delay: 750,
  },
]

const FeaturesSection = () => {
  const theme = useTheme()

  return (
    <Box id="features" sx={{ py: 10, bgcolor: "background.default" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: '""',
                position: "absolute",
                width: "60px",
                height: "4px",
                bottom: "-10px",
                left: "calc(50% - 30px)",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "2px",
              },
            }}
          >
            Key Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto", mt: 3 }}>
            Our platform offers a comprehensive suite of tools to analyze and predict groundwater levels
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Zoom in={true} style={{ transitionDelay: `${feature.delay}ms` }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "visible",
                    position: "relative",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderTopLeftRadius: theme.shape.borderRadius,
                      borderTopRightRadius: theme.shape.borderRadius,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default FeaturesSection;

