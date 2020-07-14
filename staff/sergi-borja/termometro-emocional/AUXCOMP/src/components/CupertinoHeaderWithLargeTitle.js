import React, { Component } from "react";
import styled, { css } from "styled-components";
import IoniconsIcon from "react-native-vector-icons/dist/Ionicons";

function CupertinoHeaderWithLargeTitle(props) {
  return (
    <Container {...props}>
      <Header>
        <LeftWrapper>
          <LeftIconButton>
            <ButtonOverlay>
              <IoniconsIcon
                name="ios-arrow-back"
                style={{
                  color: "#007AFF",
                  fontSize: 32
                }}
              ></IoniconsIcon>
              <LeftText>Back</LeftText>
            </ButtonOverlay>
          </LeftIconButton>
        </LeftWrapper>
        <RightWrapper>
          <Button>
            <ButtonOverlay>
              <RightText>Action</RightText>
            </ButtonOverlay>
          </Button>
        </RightWrapper>
      </Header>
      <TextWrapper>
        <MyFamily numberOfLines={1}>My Family</MyFamily>
      </TextWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #EFEFF4;
  padding-right: 8px;
  padding-left: 8px;
  flex-direction: column;
`;

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const Header = styled.div`
  width: 344px;
  height: 44px;
  flex-direction: row;
  display: flex;
`;

const LeftWrapper = styled.div`
  flex: 1 1 0%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const LeftIconButton = styled.div`
  flex-direction: row;
  border: none;
`;

const LeftText = styled.span`
  font-family: Arial;
  font-size: 17px;
  color: #007AFF;
  padding-left: 5px;
  align-self: center;
`;

const RightWrapper = styled.div`
  flex: 1 1 0%;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const Button = styled.div`
  flex-direction: column;
  display: flex;
  border: none;
`;

const RightText = styled.span`
  font-family: Arial;
  color: #007AFF;
  font-size: 17px;
  align-self: center;
`;

const TextWrapper = styled.div`
  height: 52px;
  padding-left: 5px;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const MyFamily = styled.span`
  font-family: Roboto;
  font-size: 34px;
  font-weight: 600;
  line-height: 40px;
  color: #000;
`;

export default CupertinoHeaderWithLargeTitle;
