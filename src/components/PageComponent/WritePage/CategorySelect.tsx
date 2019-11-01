import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/reducer";
import Category from "../../Form/Category";
import styled from "styled-components";
import { shareCategoryHandle } from "../../../store/forms/Share";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function WritePageCategorySelect() {
  const dispatch = useDispatch();
  const { categorys, categorysOn } = useSelector((state: RootState) => ({
    ...state.Forms.Share,
    categorys: state.Categorys.categorys,
    categorysOn: state.Forms.Share.category
  }));
  const toggle = useCallback(
    (i: number) => {
      return () => {
        dispatch(shareCategoryHandle(i));
      };
    },
    [dispatch]
  );
  return (
    <Flex>
      {categorys.map((category, i) => (
        <Category onClick={toggle(i)} select={i === categorysOn} key={i}>
          {category}
        </Category>
      ))}
    </Flex>
  );
}

export default WritePageCategorySelect;
