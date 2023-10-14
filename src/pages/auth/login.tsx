import { useEffect } from "react";
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

export default function Login() {
  const { login, isSuccessLogin, loginErrors, isLoadingLogin } = useUserApi();
  const router = useRouter();

  const handleLogin = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  useEffect(() => {
    if (isSuccessLogin) {
      router.push("/");
    }
  }, [isSuccessLogin, router]);

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
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Link href="/auth/signup">
            {"Don't have an account yet? Sign Up"}
          </Link>
          {loginErrors.map((error) => {
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
              Login
            </Button>
          </Box>
        </Box>
        {isLoadingLogin && <CircularProgress />}
      </Box>
    </Container>
  );
}
