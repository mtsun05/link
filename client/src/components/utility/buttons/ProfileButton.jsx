import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../../../api/fetchAPI";
import { Link } from "react-router-dom";

export default function ProfileButton({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { authUser, loggedIn, setUser, setLoggedIn } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      const data = await fetchAPI("/auth/logout", {
        method: "POST",
      });
      setUser(null);
      setLoggedIn(false);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.error("Error logging out: ", e.message);
    }
  };
  return (
    <>
      <div className="m-2">
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 45, height: 45 }}>
              {user.name && user.name[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{ borderRadius: 2 }}
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#1d1f24",
                color: "#ffffff",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
                "& .MuiMenuItem-root": {
                  fontFamily: "Roboto, sans-serif",
                  transition: "background-color 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                },
                borderRadius: 2,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/dashboard">
            Dashboard
          </MenuItem>
          <Divider sx={{ bgcolor: "#444444" }} />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
