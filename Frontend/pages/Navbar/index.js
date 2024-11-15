import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Select,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AdminLogin from "../Admin";
import axios from "axios";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

const drawerWidth = 240;

export default function Navbar({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [anchorElCourses, setAnchorElCourses] = useState(null);
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const router = useRouter();

  const getServiceRouting = (service) => {
    const parts = service.split(" ");
    return parts[0];
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleToggleCourses = () => {
    setShowCourses((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpen = () => {
    setOpen(true);
    router.push("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCourses = (course) => {
    setSelectedCourse(course);
    handleCloseCourses();
  };

  const handleMenuOpenCourses = (event) => {
    setAnchorElCourses(event.currentTarget);
  };

  const handleCloseCourses = () => {
    setAnchorElCourses(null);
  };

  const handleClickServices = (service) => {
    handleCloseServices();
  };

  const handleMenuOpenServices = (event) => {
    setAnchorElServices(event.currentTarget);
    console.log("Menu opened for Services:", event.currentTarget);
  };

  const handleCloseServices = () => {
    setAnchorElServices(null);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://smartcliff-app.onrender.com/categories"
      );
      if (Array.isArray(response.data)) {
        setCategories(response.data);
        console.log("Fetched categories:", response.data);
      } else {
        console.error("Invalid categories data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://smartcliff-app.onrender.com/servicelists"
      );
      if (Array.isArray(response.data)) {
        setServices(response.data);
        console.log("Fetched categories:", response.data);
      } else {
        console.error("Invalid categories data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFilterChange = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedFilter(selectedCategory);

    if (selectedCategory) {
      try {
        const response = await axios.get(
          `https://smartcliff-app.onrender.com/courses?category=${selectedCategory}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    } else {
      fetchCourses();
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", zIndex: "10" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: "700" }}>
        Smartcliff
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link href="/" passHref>
            <ListItemButton sx={{ flexDirection: "row", alignItems: "center" }}>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/about" passHref>
            <ListItemButton sx={{ flexDirection: "row", alignItems: "center" }}>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleToggleCourses}
            sx={{ flexDirection: "row", alignItems: "center" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <SchoolIcon />
            </ListItemIcon>
            <Link href="/Courses" passHref>
              <ListItemText primary="Courses" />
            </Link>
          </ListItemButton>
          <Menu
            anchorEl={anchorElCourses}
            open={Boolean(anchorElCourses)}
            onClose={handleCloseCourses}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ width: "500px", marginRight: "3rem" }}>
            <MenuItem value="">
              <Link href="/Courses" passHref>
                All Courses
              </Link>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category}>
                <Link href={`/Courses?category=${category.category}`} passHref>
                  {category.category}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ flexDirection: "row", textAlign: "center" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <BuildIcon />
            </ListItemIcon>
            <Link href="/services" passHref>
              <ListItemText primary="Services" />
            </Link>
          </ListItemButton>
          <Menu
            anchorEl={anchorElServices}
            open={Boolean(anchorElServices)}
            onClose={handleCloseServices}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ width: "500px", marginRight: "3rem" }}>
            <MenuItem>
              <Link href="/services" passHref>
                All Services
              </Link>
            </MenuItem>
            {services.map((service) => (
              <MenuItem key={service.s_id}>
                <Link
                  href={`/services/${getServiceRouting(service.service)}`}
                  passHref>
                  {service.service}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ flexDirection: "row", textAlign: "center" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <ChatIcon />
            </ListItemIcon>
            <Link href="/enquiry" passHref>
              <ListItemText primary="Enquiry" />
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="/login" passHref>
              <ListItemText primary="Login" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="navbar" style={{ zIndex: "10" }}>
      <div>
        {/* Separate div for the navbar */}
        <AppBar
          position="fixed"
          style={{
            height: "50px",
            backgroundColor: "#2c2c2c",
            zIndex: 2,
          }}>
          <Toolbar
            sx={{
              textAlign: "center",
              marginTop: "-.5rem",
              padding: "2rem",
            }}>
            <Button
              color="inherit"
              style={{
                borderRadius: "15px",
                background: "#F2705A",
                marginRight: "1rem",
                fontSize: "13px",
                padding: "3px 10px",
                fontWeight: "bold",
                // lineHeight:"15px"
              }}
              component={Link}
              href="/hire"
              className="ribbon_text">
              Hire from us
            </Button>

            <Button
              color="inherit"
              style={{
                borderRadius: "15px",
                background: "#F2705A",
                marginRight: "1rem",
                fontSize: "13px",
                padding: "3px 10px",
                fontWeight: "bold",
                display: "none",
                // lineHeight:"15px"
              }}
              component={Link}
              href="/hire"
              className="ribbonr">
              Hire
            </Button>

            <Button
              color="inherit"
              style={{
                borderRadius: "15px",
                background: "#F2705A",
                marginRight: "1rem",
                fontSize: "13px",
                padding: "3px 10px",
                fontWeight: "bold",
                // lineHeight:"15px"
              }}
              className="ribbon_text"
              component={Link}
              href="/apply">
              Apply Now
            </Button>

            <Button
              color="inherit"
              style={{
                borderRadius: "15px",
                background: "#F2705A",
                marginRight: "1rem",
                fontSize: "13px",
                padding: "3px 10px",
                fontWeight: "bold",
                display: "none",
                // lineHeight:"15px"
              }}
              className="ribbonr"
              component={Link}
              href="/apply">
              Apply
            </Button>

            <Button
              color="inherit"
              style={{
                borderRadius: "15px",
                background: "#F2705A",
                marginRight: "1rem",
                fontSize: "13px",
                padding: "3px 10px",
                fontWeight: "bold",
                // lineHeight:"15px"
              }}
              component={Link}
              href="/Contact"
              className="ribbon_text">
              Contact us
            </Button>

            <Button
              color="inherit"
              style={{
                borderRadius: "15px",
                background: "#F2705A",
                marginRight: "1rem",
                fontSize: "13px",
                padding: "3px 10px",
                display: "none",
                fontWeight: "bold",
                // lineHeight:"15px"
              }}
              className="ribbonr"
              component={Link}
              href="/Contact">
              Contact
            </Button>

            <Typography
              variant="p"
              sx={{
                fontSize: "14px",
                marginLeft: "auto",
                display: { sm: "none", xs: "none", md: "block" },
              }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon
                  style={{
                    marginRight: "0.5rem",
                    fontSize: "20px",
                    color: "#f2705a",
                  }}
                />
                <span style={{ marginRight: "1rem" }}>+91 811 007 5700</span>

                <EmailIcon
                  style={{
                    marginRight: "0.5rem",
                    fontSize: "20px",
                    color: "#f2705a",
                  }}
                />
                <span>sample@smartcliff.in</span>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>

        <CssBaseline />
        <AppBar
          position="fixed"
          className="Appbar"
          style={{
            top: "50px",
            backgroundColor: "#fdf0eb",
            zIndex: 1,
          }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "700",
                letterSpacing: "4px",
              }}>
              <img
                src="https://smartcliff.in/assets/images/logo.png"
                alt="logo"
              />
            </Typography>
            <Box sx={{ display: { sm: "none", xs: "none", md: "block" } }}>
              <Link href="/" passHref>
                <Button
                  sx={{
                    background: "transparent !important",
                    marginRight: "2rem",
                    color: "#000",
                    letterSpacing: "1px",
                  }}>
                  Home
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button
                  sx={{
                    background: "transparent !important",
                    marginRight: "2rem",
                    color: "#000",
                    letterSpacing: "1px",
                  }}>
                  About
                </Button>
              </Link>
              <Button
                sx={{
                  background: "transparent !important",
                  marginRight: "2rem",
                  color: "#000",
                  letterSpacing: "1px",
                }}
                onClick={handleMenuOpenCourses}>
                Courses
                <ArrowDropDownIcon />
              </Button>

              <Button
                sx={{
                  background: "transparent !important",
                  marginRight: "2rem",
                  color: "#000",
                  letterSpacing: "1px",
                }}
                onClick={handleMenuOpenServices}>
                Services
                <ArrowDropDownIcon />
              </Button>

              <Link href="/enquiry" passHref>
                <Button
                  sx={{
                    background: "transparent !important",
                    marginRight: "2rem",
                    color: "#000",
                    letterSpacing: "1px",
                  }}>
                  Enquiry
                </Button>
              </Link>
              <Button
                onClick={handleOpen}
                color="primary"
                variant="contained"
                sx={{
                  marginRight: "2rem",
                  letterSpacing: "1px",
                }}>
                Login
                {/* <AdminLogin open={open} handleClose={handleClose} /> */}
              </Button>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { sm: "block", xs: "block", md: "none" },
                flexGrow: 0,
                color: "#000",
              }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", marginTop: "40px" }}>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </Box>
      </div>
    </div>
  );
}
