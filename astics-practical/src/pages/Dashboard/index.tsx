import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Dashboard</h2>
      </Container>
      <Container maxWidth="xl">
        <Link to="/list">Go to listing page</Link>
      </Container>
    </>
  );
};

export default Dashboard;
