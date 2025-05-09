// src/components/Auth/forgotpassword.jsx
"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Link as MuiLink,
  Alert,
  CircularProgress,
  InputAdornment,
  useTheme,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import EmailIcon from "@mui/icons-material/Email"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth()
  const theme = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Password reset instructions have been sent to your email")
    } catch (error) {
      setError(error.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.1)",
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              mb: 2,
            }}
          >
            <WaterDropIcon sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Password Reset
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Enter your email to receive a password reset link
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <MuiLink component={Link} to="/login" variant="body2">
              Back to Login
            </MuiLink>
            <MuiLink component={Link} to="/signup" variant="body2">
              Create an account
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default ForgotPassword

