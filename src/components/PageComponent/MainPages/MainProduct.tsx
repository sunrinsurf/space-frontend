import React from "react";
import "./MainProduct.css";
import MainShopCard from "./MainShopCard";
import styled from "styled-components";

const SmallBox = styled.div`
  min-width: 300px;
  height:300px;
  object-fit: cover;
  background-color:gray;
  border-radius:10px;

`
const MiddleBox = styled.div`
  min-width: 600px;
  height:300px;
  object-fit: cover;
  background-color:gray;
  border-radius:10px;

`
const BigBox = styled.div`
  min-width:calc(1200px + 60px);
  height:300px;
  object-fit: cover;
  background-color:gray;
  border-radius:10px;
`
const BoxWrapper = styled.div`
  width:100%;
  margin:auto;
`

const Box = styled.div`
  margin:0px 15px;
`
const ProductTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #494949;
  margin-top:10px;
`

const Inquiry = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #1183fa;
  margin:4px 0px 8px 0px;
`

const Personnel = styled.div`
  width: 90px;
  border-radius: 8px;
  background-color: #ff388a;
  text-align:center;
  margin: 0px auto 20px auto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
padding:6px 3px;
`

function MainProduct() {
  return (
    <div className="MainProduct__wrap" id="product">
      <div className="MainProduct__Info">
        <div className="MainProduct__Title">최근 공유된 상품</div>
        <BoxWrapper>
          <div className="MainProduct__List">
            <Box>
              <SmallBox></SmallBox>
              <ProductTitle>용산 메이커 스페이스 가족을 모집합니다!</ProductTitle>
              <Inquiry>별도문의</Inquiry>
              <Personnel>최대 6인</Personnel>
            </Box>
            <Box>
              <SmallBox></SmallBox>
              <ProductTitle>용산 메이커 스페이스 가족을 모집합니다!</ProductTitle>
              <Inquiry>별도문의</Inquiry>
              <Personnel>최대 6인</Personnel>
            </Box>
            <Box>
              <MiddleBox></MiddleBox>
              <ProductTitle>용산 메이커 스페이스 가족을 모집합니다!</ProductTitle>
              <Inquiry>별도문의</Inquiry>
              <Personnel>최대 6인</Personnel>
            </Box>
          </div>
          <div className="MainProduct__List">
            <Box>
              <BigBox></BigBox>
              <ProductTitle>용산 메이커 스페이스 가족을 모집합니다!</ProductTitle>
              <Inquiry>별도문의</Inquiry>
              <Personnel>최대 6인</Personnel>
            </Box>
          </div>
        </BoxWrapper>

      </div>
    </div>
  );
}

export default MainProduct;
