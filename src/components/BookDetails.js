import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function BookDetails({ books }) {
  const [indexVal, setIndexVal] = useState(0);
  const index = useSelector((state) => state.indexValue);
  useEffect(() => {
    setIndexVal(index ? index : 0);
  }, [index]);

  return (
    <MainDiv>
      <SubDiv>
        <StyledH1>Title : {books[indexVal].title}</StyledH1>
        <StyledP>
          <b>Author: </b>
          {books[indexVal].authors[0].name}
        </StyledP>
        <StyledP>
          <b>Published Date: </b>
          {books[indexVal].published.string.slice(0, 12)}
        </StyledP>
        <StyledP>
          <b>Background: </b>
          {books[indexVal].background}
        </StyledP>
        <StyledP>
          <b>Synopsis: </b>
          {books[indexVal].synopsis}
        </StyledP>
      </SubDiv>
    </MainDiv>
  );
}

export default BookDetails;
const MainDiv = styled.div`
  display: grid;
  place-items: center;
`;
const SubDiv = styled.div`
  margin: 15px;
  padding: 10px;
  height: 85vh;
  width: 60%;
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 20px;
`;
const StyledH1 = styled.h1`
  margin: 20px;
`;
const StyledP = styled.p`
  margin: 10px;
  text-align: justify;
`;
