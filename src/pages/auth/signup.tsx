import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserApi } from "@/hooks/api/useUserApi";
import Link from "next/link";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import CircularProgress from "@/components/CircularProgress";

export default function Signup() {
  const { signup, isSuccessSignup, signupErrors, isLoadingSignup } =
    useUserApi();
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError("");
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("Confirm password");
    if (password !== confirmPassword)
      return setPasswordError("passwords should match");

    signup({
      email: data.get("email") as string,
      password: password as string,
    });
  };

  useEffect(() => {
    if (isSuccessSignup) {
      router.push("/");
    }
  }, [isSuccessSignup, router]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "2.5rem", fontFamily: "inherit" }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            fullWidth
            name="Confirm password"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
          />
          <Link href="/auth/login">{"Already have an account? Login"}</Link>
          <Typography color="error">{passwordError}</Typography>
          {signupErrors.map((error) => {
            return (
              <Typography key={error.field} color="error">
                {error?.message}
              </Typography>
            );
          })}
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                width: "18rem",
                bgcolor: "white",
                color: "black",
                borderRadius: "9px",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
        {isLoadingSignup && <CircularProgress />}
      </Box>
    </Container>
  );
}
