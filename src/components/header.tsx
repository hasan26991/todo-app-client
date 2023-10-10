import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import Image from "next/image";

const Header = () => {
  return (
    <Box sx={{}}>
      <AppBar
        position="static"
        sx={{ bgcolor: "inherit", color: "inherit", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            "@media (min-width: 0px)": {
              padding: 0,
            },
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "1.5rem", fontWeight: 700 }}
              // component="div"
            >
              TO DO APP
            </Typography>
            <Typography sx={{ fontSize: "0.75rem" }}>
              Stop Procrastinating, Start Organizing
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <Image
                src="/assets/DarkLightMode.svg"
                height={30}
                width={30}
                alt="dark like icon"
              />
            </IconButton>
            <Avatar sx={{ width: "3rem", height: "3rem" }}>H</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
      <Divider />
    </Box>
  );
};

export default Header;
