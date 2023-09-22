import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { InputBase } from "@mui/material";
import { Select } from "antd";
import { Typography } from "@mui/material";
import BookImg from "./images/BookImg.jpg";
import {
  homeAction,
  isEditFn,
  libraryAction,
  searchAction,
} from "./redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function ResponsiveAppBar() {
  const dispatch = useDispatch();

  // Library and Home Action
  const selectHandler = (value) => {
    value === "1" && dispatch(homeAction());
    value === "2" && dispatch(libraryAction());
    navigate("/");
  };

  // Search Bar action
  const searchHandler = (e) => {
    dispatch(homeAction());
    dispatch(searchAction(e?.target.value));
  };

  // Router
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 20%, rgba(148,187,233,1) 100%)",
        height: "10vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MenuIcon size="large" />
            <Select
              defaultValue="Sort By"
              style={{
                width: "100px",
                fontSize: "5px",
                position: "absolute",
                opacity: "0",
                zIndex: "1",
              }}
              value={null}
              onChange={selectHandler}
              options={[
                { value: "1", label: "Home" },
                { value: "2", label: "Library" },
                { value: "3", label: "Add Book" },
              ]}
            />
            <Typography sx={{ width: "100%" }} style={{ paddingLeft: "10%" }}>
              <img
                height="50px"
                width="50px"
                style={{ mixBlendMode: "multiply" }}
                src={BookImg}
                alt="Book"
              />
            </Typography>

            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                border: "2px solid white",
                borderRadius: "20px",
                color: "white",
                padding: "0 10px",
                height: "fit-content",
                marginLeft: "auto",
                "@media (max-width: 476px)": {
                  fontSize: "10px",
                  height: "fit-content",
                },
              }}
              onChange={(e) => {
                searchHandler(e);
              }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              padding: "0 50px",
            }}
          >
            <Button
              key={1}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(homeAction());
                navigate("/");
              }}
            >
              Home
            </Button>

            <Button
              key={2}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(libraryAction());
                navigate("/");
              }}
            >
              Library
            </Button>
            <Button
              key={2}
              sx={{ my: 2, color: "white", display: "block", width: "200px" }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(libraryAction());
                dispatch(isEditFn(false));
                navigate("/AddBook");
              }}
            >
              Add Book
            </Button>

            <Typography sx={{ width: "100%" }}>
              <img
                height="50px"
                width="50px"
                style={{ mixBlendMode: "multiply" }}
                src={BookImg}
                alt="Book"
              />
            </Typography>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                border: "2px solid white",
                borderRadius: "20px",
                color: "white",
                padding: "0 10px",
                height: "fit-content",
                width: "25%",
              }}
              onChange={(e) => {
                searchHandler(e);
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
