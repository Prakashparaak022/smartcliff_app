import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { PersonOutlined as PersonOutlinedIcon } from "@mui/icons-material";

const drawerWidth = 280;

export default function Navbar({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("formData.username");
    if (name) {
      setAdminName(name);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", zIndex: "10"}}
    >
      <Typography variant="h6" sx={{ my: 2, fontWeight: "700"}}>
        Management
      </Typography>
      <List >
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/dashboard" passHref>
              Course Management
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/dashboard/service_management" passHref>
              Service Management
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/dashboard/enquiry_management" passHref>
              Enquiry Management
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/dashboard/details_management" passHref>
              Details Management
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/dashboard/category_management" passHref>
              Category Management
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/dashboard/apply_management" passHref>
              Applications Management
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="navbar">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Management
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", marginTop: "64px" }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="right" 
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: "20px",
            backgroundColor: "#f0f0f0",
            border: "2px solid #f2705a",
            fontSize: "19px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar style={{ marginRight: "10px",background:"#f2705a" }}>
            <PersonOutlinedIcon />
          </Avatar>
          <Typography variant="body2"
          style={{
            fontWeight:"bolder",
            fontFamily:"poppins"
          }}
          >
            Welcome, {adminName} !
          </Typography>
        </Paper>
        <div style={{ position: 'absolute', top: 0, right: 0, marginTop: "10px" }}>
          <Button
            edge="end"
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ marginRight: "5px" }}
          >
            Logout
          </Button>
        </div>
      </Box>
    </div>
  );
}