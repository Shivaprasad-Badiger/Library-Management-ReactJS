import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MuiTable from "./components/MuiTable";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/manga")
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<MuiTable books={books} />}></Route>
            <Route path="/bookDetails" element={<BookDetails books={books} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
