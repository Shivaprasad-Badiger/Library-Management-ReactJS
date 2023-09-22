import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routerIndexAction, isEditFn } from "./redux/action";
import { useNavigate } from "react-router-dom";

function MuiTable({ books, setBooks }) {
  const columns = [
    {
      width: "12%",
      label: "Sl No",
      dataKey: "slno",
    },
    {
      width: "22%",
      label: "Title",
      dataKey: "title",
    },
    {
      width: "22%",
      label: "Author",
      dataKey: "author",
    },
    {
      width: "22%",
      label: "Publish Date",
      dataKey: "date",
    },
    {
      width: "22%",
      label: "Actions",
      dataKey: "actions",
    },
  ];

  //   Add Book to Library
  const libraryStatus = useSelector((state) => state.isLibrary);
  const [tempData, setTempData] = useState([]);
  const addDataFunction = (index) => {
    setTempData([
      ...tempData,
      {
        slno: tempData.length + 1,
        title: books[index].title,
        author: books[index].author,
        date: books[index].date,
      },
    ]);
  };
  // Delete book from Library
  const deleteItem = (deleterIndex) => {
    const updatedItems = tempData.filter((_, index) => index !== deleterIndex);
    setTempData(updatedItems);
  };

  // SerachBar
  const searchVal = useSelector((state) => state.searchValue);
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    if (searchVal) {
      setSearchData(
        books.filter((item) =>
          ["title", "author"].some((prop) =>
            item[prop]?.toLowerCase().startsWith(searchVal.toLowerCase())
          )
        )
      );
    } else {
      setSearchData([]);
    }
  }, [searchVal]);

  // Router
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Table
  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || true ? "right" : "left"}
            style={{
              width: column.width,
              textAlign: "center",
            }}
            sx={{
              backgroundColor: "background.paper",
              fontWeight: "bold",
              "@media (max-width: 476px)": {
                fontSize: "10px",
                height: "fit-content",
                padding: "15px 10px",
              },
            }}
            contentEditable
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  
  const iconStyle = {
    flex: "25px 0 25%",
    "@media (max-width: 426px)": {
      height: "fit-content",
      fontSize: "18px",
      flex: "10px 0 50%",
    },
  };

  // Books editable content
  const updatedBooks = [...books];

  function rowContent(index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.dataKey === "title" ? "left" : "center"}
            sx={{
              padding: 0,
              "@media (max-width: 476px)": {
                fontSize: "10px",
                height: "fit-content",
                padding: "10px 10px",
              },
            }}
            contentEditable={column.dataKey === "actions" ? false : true}
          >
            {column.dataKey === "actions" ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {libraryStatus && (
                  <Tooltip title="Add to Library">
                    <AddOutlinedIcon
                      sx={iconStyle}
                      style={{ color: "green" }}
                      onClick={() => {
                        addDataFunction(index);
                      }}
                    />
                  </Tooltip>
                )}

                {!libraryStatus && (
                  <Tooltip title="Delete from Library">
                    <DeleteForeverOutlinedIcon
                      sx={iconStyle}
                      style={{ color: "red" }}
                      onClick={() => {
                        deleteItem(index);
                      }}
                    />
                  </Tooltip>
                )}
                {libraryStatus && (
                  <Tooltip title="Edit Book">
                    <EditOutlinedIcon
                      sx={iconStyle}
                      style={{ color: "yellow" }}
                      onClick={() => {
                        dispatch(routerIndexAction(index));
                        dispatch(isEditFn(true));
                        navigate("/addBook");
                      }}
                    />
                  </Tooltip>
                )}
                <Link to="/bookDetails">
                  <Tooltip title="View Details">
                    <VisibilityOutlinedIcon
                      sx={iconStyle}
                      style={{ color: "#8acdf8ff" }}
                      onClick={(e) => {
                        dispatch(routerIndexAction(index));
                      }}
                    />
                  </Tooltip>
                </Link>
              </div>
            ) : (
              <InputStyled
                defaultValue={row[column.dataKey]}
                type={column.dataKey === "price" ? "number" : "text"}
                onChange={(e) => {
                  updatedBooks[index] = {
                    ...updatedBooks[index],
                    [column.dataKey]: e.target.value,
                  };
                }}
                onBlur={() => {
                  setBooks(updatedBooks);
                }}
              />
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }
  return (
    <StyledPpaer>
      <TableVirtuoso
        data={
          searchVal !== ""
            ? searchData.map((item, index) => {
                return {
                  slno: index + 1,
                  title: item.title,
                  author: item.author,
                  date: item.date,
                };
              })
            : libraryStatus
            ? books.map((item, index) => {
                return {
                  slno: index + 1,
                  title: item.title,
                  author: item.author,
                  date: item.date,
                };
              })
            : tempData
        }
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </StyledPpaer>
  );
}
export default MuiTable;

const StyledPpaer = styled(Paper)`
  height: 90vh;
  width: 100%;
`;
const InputStyled = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  text-align: center;
`;
