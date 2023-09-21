import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddBook({ books, setBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [background, setBackground] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const navigate = useNavigate();

  //   edit
  const isEditVal = useSelector((state) => state.isEdit);
  console.log("isedit: ", isEditVal);
  const index = useSelector((state) => state.indexValue);

  useEffect(() => {
    if (isEditVal) {
      setTitle(books[index].title);
      setAuthor(books[index].authors[0].name);
      setPublishDate(books[index].string);
      setBackground(books[index].background);
      setSynopsis(books[index].synopsis);
    }
  }, [index]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isEditVal) {
      setBooks([
        ...books,
        {
          title: title,
          authors: [{ name: author }],
          published: {
            string: publishDate,
          },
          background: background,
          synopsis: synopsis,
        },
      ]);
    } else {
      const tempDataSet = [...books];
      tempDataSet[index] = {
        title: title,
        authors: [{ name: author }],
        published: {
          string: publishDate,
        },
        background: background,
        synopsis: synopsis,
      };
      setBooks(tempDataSet);
    }
    navigate("/");
  }

  return (
    <div>
      <MainDiv>
        <SubDiv>
          <h1> Add Book</h1>
          <Form onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              fullWidth
              required
            />
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Published Date"
              defaultValue=""
              onChange={(e) => setPublishDate(e.target.value)}
              value={publishDate}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Background"
              onChange={(e) => setBackground(e.target.value)}
              value={background}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Synopsis"
              onChange={(e) => setSynopsis(e.target.value)}
              value={synopsis}
              fullWidth
              required
            />
            <Button variant="outlined" color="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </SubDiv>
      </MainDiv>
    </div>
  );
}

export default AddBook;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;
const MainDiv = styled.div`
  display: grid;
  place-items: center;
`;
const SubDiv = styled.div`
  margin: 15px;
  padding: 20px;
  width: 60%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 20px;
  @media screen and (max-width: 426px) {
    width: 90%;
    height: fit-content;
  }
`;
