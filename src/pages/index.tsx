import axios from "axios";
import { useState } from "react";
import { useTodoApi } from "@/hooks/api/useTodoApi";
import CircularProgress from "@/components/CircularProgress";
import { NextPageContext } from "next";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Button, List, Paper, InputBase, Typography } from "@mui/material";
import TodosList from "@/components/TodosList";

Home.getInitialProps = async (ctx: NextPageContext) => {
  const res = await axios.get(`${process.env.BASE_URL}/user/currentuser`, {
    withCredentials: true,
  });
  if (!res.data.currentUser) {
    if (typeof window == "undefined" && ctx.res) {
      ctx.res.writeHead(302, { Location: "/auth/login" });
      ctx.res.end();
    }
  }
  return {};
};

export default function Home() {
  const [showFilteredTodos, setShowFilteredTodos] = useState(false);

  const { addTodo, addTodoErrors, completedTodos, isLoading } = useTodoApi();

  const handleAddTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addTodo({
      message: data.get("message") as string,
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "4vh",
            mb: "4vh",
            "@media (max-width: 780px)": {
              justifyContent: "flex-start",
              flexDirection: "column-reverse",
              gap: "1rem",
            },
          }}
        >
          <Typography
            sx={{ fontSize: "0.85rem", display: "flex", alignItems: "end" }}
          >
            {`${completedTodos} Completed`}
          </Typography>
          <Button
            onClick={() => {
              setShowFilteredTodos(!showFilteredTodos);
            }}
            sx={{
              bgcolor: "#B4B4B4",
              color: "black",
              borderRadius: "9px",
              p: "0.8rem 2rem",
              fontSize: "1rem",
              fontWeight: 400,
              width: "250px",
            }}
            startIcon={showFilteredTodos ? <Visibility /> : <VisibilityOff />}
          >
            {showFilteredTodos ? "Show Completed" : "Hide Completed"}
          </Button>
        </Paper>
        <Box
          sx={{
            overflowY: "hidden",
            flexGrow: 1,
            height: "100px",
            mb: "5vw",
          }}
        >
          <List
            sx={{
              bgcolor: "background.paper",
              overflow: "scroll",
              height: "100%",
            }}
          >
            <TodosList showFilteredTodos={showFilteredTodos} />
          </List>
        </Box>
        {addTodoErrors.map((error) => {
          return (
            <Typography key={error.field} color="error">
              {error?.message}
            </Typography>
          );
        })}
        {isLoading && <CircularProgress />}
      </Box>
      <Paper
        component="form"
        onSubmit={handleAddTodo}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          height: "5rem",
          bgcolor: "#DADADA",
          position: "sticky",
          bottom: "0px",
        }}
      >
        <InputBase
          sx={{ ml: 4, flex: 1, fontFamily: "inherit", fontSize: "1rem" }}
          placeholder="NEW NOTE"
          name="message"
          inputProps={{ "aria-label": "NEW NOTE" }}
        />
        <Button
          sx={{
            bgcolor: "white",
            color: "black",
            mr: "30px",
            borderRadius: "9px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontFamily: "inherit",
            "@media (max-width: 780px)": {
              display: "none",
            },
          }}
          type="submit"
          variant="text"
        >
          Add New Note
        </Button>
        <Button
          sx={{
            bgcolor: "white",
            color: "black",
            mr: "10px",
            borderRadius: "9px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontFamily: "inherit",
            "@media (min-width: 780px)": {
              display: "none",
            },
          }}
          type="submit"
          variant="text"
        >
          Add
        </Button>
      </Paper>
    </Box>
  );
}
