import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("password");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "end", margin: "15px 0" }}
    >
      <Button
        variant="outlined"
        sx={{ padding: "auto" }}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Header;
