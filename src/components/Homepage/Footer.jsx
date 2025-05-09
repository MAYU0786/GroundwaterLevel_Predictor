import { Box, Typography, Container, Grid, Link, IconButton, Divider } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import WaterDropIcon from "@mui/icons-material/WaterDrop"

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a2027", color: "white", py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <WaterDropIcon sx={{ fontSize: 28, mr: 1, color: "primary.light" }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Groundwater Predictor
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
              Advanced groundwater level prediction platform using cutting-edge AI and machine learning technologies.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }}>
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Home
              </Link>
              <Link href="/predict" color="inherit" underline="hover" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Prediction Tool
              </Link>
              <Link href="#features" color="inherit" underline="hover" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Features
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: "rgba(255,255,255,0.7)" }}>
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Contact
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "rgba(255,255,255,0.7)" }}>
              Email: info@groundwaterpredictor.com , 
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "rgba(255,255,255,0.7)" }}>
              Phone: +91 5551234567
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              Address: Ramdeobaba University , Nagpur
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.1)" }} />

        <Typography variant="body2" align="center" sx={{ color: "rgba(255,255,255,0.5)" }}>
          © {new Date().getFullYear()} Groundwater Predictor. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer;

