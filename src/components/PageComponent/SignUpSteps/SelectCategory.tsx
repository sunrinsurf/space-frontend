import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SignUpStepProps from "./SignUpStepProps";
import { RootState } from "../../../store/reducer";
import { categoryToggle, signUpComplete } from "../../../store/SignUp";
import Button from "../../Form/Button";
import ErrorComponent from "../../ErrorComponent";
import Category from "../../Form/Category";

import "./SelectCategory.css";


const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom:50px;
  @media(max-width:768px){
    margin-bottom:0px;
  }
`;

function SelectCategory({ toNext }: SignUpStepProps) {
  const { categorys, success, sign_error, categorysOn } = useSelector((state: RootState) => ({ ...state.SignUp, categorys: state.Categorys.categorys }));
  const dispatch = useDispatch();

  const onCategoryToggle = useCallback(
    (i: number) => {
      return () => {
        dispatch(categoryToggle(i));
      };
    },
    [dispatch]
  );
  const completeSignUp = useCallback(() => {
    console.log('complete');
    dispatch(signUpComplete());
  }, [dispatch]);
  useEffect(() => {
    if (success) toNext();
  }, [success, toNext])
  return (
    <div className="SelectCategory">
      {sign_error && <ErrorComponent>{sign_error}</ErrorComponent>}
      <h1 className="SelectCategory__Title">흥미가 있는 카테고리를 선택해 주세요.</h1>
      <CategoryList>
        {categorys.map((data, i) => (
          <Category
            role="button"
            select={categorysOn && categorysOn[i]}
            key={i}
            onClick={onCategoryToggle(i)}
          >
            {data}
          </Category>
        ))}
      </CategoryList>
      <div className="SelectCategory__Button">
        <Button fullWidth onClick={completeSignUp}>
          회원가입 완료하기
      </Button>
      </div>
    </div>
  );
}

export default SelectCategory;
