import axios from "axios";
import { useState } from "react";
import { useTodoApi } from "@/hooks/api/useTodoApi";
import CircularProgress from "@/components/CircularProgress";
import { NextPageContext } from "next";
import Image from "next/image";
import { VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
  ListItem,
  IconButton,
  Paper,
  InputBase,
  Typography,
} from "@mui/material";

Home.getInitialProps = async (ctx: NextPageContext) => {
  const res = await axios.get(`${process.env.BASE_URL}/user/currentuser`, {
    headers: ctx.req?.headers,
    withCredentials: true,
  });
  // if (!res.data.currentUser) {
  //   if (typeof window == "undefined" && ctx.res) {
  //     ctx.res.writeHead(302, { Location: "/auth/login" });
  //     ctx.res.end();
  //   }
  // }
  return {};
};

export default function Home() {
  const [showFilteredTodos, setShowFilteredTodos] = useState(false);

  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    addTodoErrors,
    filteredTodos,
    isLoading,
  } = useTodoApi();

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
              // justifyContent: "flex-start",
              // flexDirection: "column-reverse",
            },
          }}
        >
          <Typography sx={{ fontSize: "0.85rem" }}>6 Completed</Typography>
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
              // width: "200px",
            }}
            // variant="text"
            startIcon={<VisibilityOff />}
          >
            Hide Completed
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
              // flexGrow: 1,
              height: "100%",
            }}
          >
            {todos.map((todo) => {
              return (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => {
                        deleteTodo({ id: todo.id });
                      }}
                    >
                      <Image
                        height={30}
                        width={30}
                        src="/assets/Delete.svg"
                        alt="delete icon"
                      ></Image>
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      updateTodo({ id: todo.id });
                    }}
                    dense
                  >
                    <ListItemIcon sx={{}}>
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: "1.8rem" },
                          color: "#DADADA",
                          "&.Mui-checked": {
                            color: "#29ABE2",
                          },
                        }}
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": todo.message }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        style: {
                          fontSize: "1rem",
                          fontFamily: "inherit",
                          textDecorationLine: todo.completed
                            ? "line-through"
                            : "none",
                        },
                      }}
                      id={todo.id}
                      primary={todo.message}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
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
          }}
          type="submit"
          variant="text"
        >
          Add New Note
        </Button>
      </Paper>
    </Box>
  );
}
