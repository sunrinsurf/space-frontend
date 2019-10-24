import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import SignUpStepProps from "./SignUpStepProps";
import { RootState } from "../../../store/reducer";
import { categoryToggle } from "../../../store/SignUp";

const Category = styled.div<{ select?: boolean }>`
  padding: 1em;
  border-radius: 10px;
  width: fit-content;
  margin: 10px;
  transition: background 0.5s, color 0.5s;
  cursor: pointer;
  ${props => {
    if (props.select) {
      return css`
        color: white;
        background: #6b32a8;
      `;
    }
    return css`
      background: #b4b4b4;
    `;
  }}
`;
const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SelectCategory({ toNext }: SignUpStepProps) {
  const { categorys } = useSelector((state: RootState) => state.SignUp);
  const dispatch = useDispatch();

  const onCategoryToggle = useCallback(
    (i: number) => {
      return () => {
        dispatch(categoryToggle(i));
      };
    },
    [dispatch]
  );
  return (
    <div>
      <h1>흥미가 있는 카테고리를 선택해 주세요.</h1>
      <CategoryList>
        {categorys.map((data, i) => (
          <Category
            role="button"
            select={data.checked}
            key={i}
            onClick={onCategoryToggle(i)}
          >
            {data.name}
          </Category>
        ))}
      </CategoryList>
    </div>
  );
}

export default SelectCategory;
