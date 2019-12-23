import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import searchIcon from "../../../assets/icons/ic-search.svg";
import { changeSearch } from "../../../store/forms/SearchShare";
import { RootState } from "../../../store/reducer";

const Form = styled.form`
  margin-bottom: 3em;
  position: relative;
  .search {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: 2px solid #494949;
    outline: 0;
    font-size: 1.5rem;
    padding: 8.4px 14px;
    transition: border-color 1s;

    &:active {
      border-color: black;
    }
    @media(max-width:768px){
      &::-webkit-input-placeholder {
        color: transparent;
      }
      &:-ms-input-placeholder {
        color: transparent;
      }
    }
  }

  .searchButton {
    all: unset;
    position: absolute;
    bottom: 8px;
    right: 5px;
    z-index:100;
    background-color:white;
    img {
      width: 32px;
      height: 32px;
    }
  }
`;
function LoginedMainPageSearch() {
  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.Forms.SearchShare);
  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeSearch(e.target.value));
  }
  return (
    <Form>
      <input
        value={search}
        onChange={onchange}
        type="text"
        className="search"
        placeholder="상품명, 카테고리 등으로 다양한 상품을 검색해 보세요."
      />
      <button className="searchButton">
        <img src={searchIcon} draggable={false} alt="Search Icon" />
      </button>
    </Form>
  );
}

export default LoginedMainPageSearch;
