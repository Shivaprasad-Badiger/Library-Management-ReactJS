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
import AddBook from "./components/AddBook";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/manga")
      .then((response) => {
        const dataset = response.data.data;
        setBooks(
          dataset.map((item, index) => {
            return {
              slno: index + 1,
              title: item.title,
              author: item.authors[0].name,
              date: item.published.string.slice(0, 12),
              background: item.background,
              synopsis: item.synopsis,
            };
          })
        );
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
            <Route
              path="/"
              element={<MuiTable books={books} setBooks={setBooks} />}
            ></Route>
            {/* <Route path="/" element={<TableNormal books={books} />}></Route> */}
            <Route
              path="/bookDetails"
              element={<BookDetails books={books} />}
            ></Route>
            <Route
              path="/addBook"
              element={<AddBook books={books} setBooks={setBooks} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
