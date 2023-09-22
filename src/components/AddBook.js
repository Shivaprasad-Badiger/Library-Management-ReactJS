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
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //   edit
  const isEditVal = useSelector((state) => state.isEdit);
  const index = useSelector((state) => state.indexValue);

  useEffect(() => {
    if (isEditVal) {
      setTitle(books[index].title);
      setAuthor(books[index].author);
      setPublishDate(books[index].date);
      setBackground(books[index].background);
      setSynopsis(books[index].synopsis);
    }
  }, [index]);

  // Price Error
  useEffect(() => {
    price < (1000 || 0) && setError(true);
    price > 1000 && setError(false);
  }, [price]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isEditVal) {
      setBooks([
        ...books,
        {
          title: title,
          author: author,
          date: publishDate,
          background: background,
          synopsis: synopsis,
        },
      ]);
    } else {
      const tempDataSet = [...books];
      tempDataSet[index] = {
        title: title,
        author: author,
        date: publishDate,
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
          <Form name="form1" onSubmit={handleSubmit}>
            <StyledDiv>
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
            </StyledDiv>
            <StyledDiv>
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
              <TextField
                type="number"
                variant="outlined"
                color="secondary"
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                fullWidth
                required
                error={error}
                helperText={error ? "Value must be 1000 or less" : ""}
              />
              <StyledButton variant="outlined" color="secondary" type="submit">
                Submit
              </StyledButton>
            </StyledDiv>
          </Form>
        </SubDiv>
      </MainDiv>
    </div>
  );
}

export default AddBook;
const Form = styled.form`
  display: flex;
  gap: 30px;
  margin: 20px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
const MainDiv = styled.div`
  display: grid;
  place-items: center;
`;
const StyledButton = styled(Button)`
  width: fit-content;
  align-self: last baseline;
`;

const SubDiv = styled.div`
  margin: 15px;
  padding: 20px;
  width: 60%;
  height: fit-content;
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
