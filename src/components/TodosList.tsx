import { useTodoApi } from "@/hooks/api/useTodoApi";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { memo } from "react";

interface TodoListProps {
  showFilteredTodos: boolean;
}

const TodosList = (props: TodoListProps) => {
  const { showFilteredTodos } = props;

  const { deleteTodo, updateTodo, todos, filteredTodos } = useTodoApi();

  const ListToRender = showFilteredTodos ? filteredTodos : todos;

  const onUpdate = (id: string) => {
    updateTodo({ id });
  };
  const onDelete = (id: string) => {
    deleteTodo({ id });
  };

  const List = ListToRender.map((todo) => {
    return (
      <ListItem
        key={todo.id}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => {
              onDelete(todo.id);
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
            onUpdate(todo.id);
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
                wordWrap: "break-word",
                textDecorationLine: todo.completed ? "line-through" : "none",
              },
            }}
            id={todo.id}
            primary={todo.message}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return List;
};

export default memo(TodosList);
