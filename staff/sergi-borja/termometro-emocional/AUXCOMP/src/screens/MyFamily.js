import React, { Component } from "react";
import styled, { css } from "styled-components";
import CupertinoHeaderWithLargeTitle from "../components/CupertinoHeaderWithLargeTitle";
import CupertinoButtonLight from "../components/CupertinoButtonLight";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/dist/Ionicons";

function MyFamily(props) {
  return (
    <Image
      src={require("../assets/images/tree-background1.jpg")}
      resizeMode="contain"
    >
      <CupertinoHeaderWithLargeTitle
        style={{
          height: 97,
          width: 375,
          marginTop: 76,
          marginLeft: 65
        }}
      ></CupertinoHeaderWithLargeTitle>
      <CupertinoButtonLight
        style={{
          height: 44,
          width: 100,
          borderRadius: 100,
          marginTop: 25,
          marginLeft: 315
        }}
      ></CupertinoButtonLight>
      <Rect2>
        <MartinaTarresStackRow>
          <MartinaTarresStack>
            <MartinaTarres>Martina Tarres</MartinaTarres>
            <MartinaTarres1>Martina Tarres</MartinaTarres1>
            <MartinaTarres4>Martina Tarrés</MartinaTarres4>
          </MartinaTarresStack>
          <FontAwesomeIcon
            name="edit"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 40,
              height: 40,
              width: 40,
              marginLeft: 7
            }}
          ></FontAwesomeIcon>
        </MartinaTarresStackRow>
      </Rect2>
      <MartinaTarres3Stack>
        <MartinaTarres3>Martina Tarres</MartinaTarres3>
        <Rect3>
          <FontAwesomeIcon
            name="edit"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 40,
              height: 40,
              width: 40,
              marginTop: 19,
              marginLeft: 263
            }}
          ></FontAwesomeIcon>
        </Rect3>
      </MartinaTarres3Stack>
      <Rect>
        <IconRow>
          <FontAwesomeIcon
            name="group"
            style={{
              color: "rgba(0,0,0,1)",
              fontSize: 40,
              height: 40,
              width: 43,
              marginTop: 10
            }}
          ></FontAwesomeIcon>
          <IoniconsIcon
            name="md-stats"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 54,
              width: 37,
              height: 58,
              marginLeft: 81
            }}
          ></IoniconsIcon>
          <IoniconsIcon
            name="ios-settings"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 51,
              height: 56,
              width: 38,
              marginLeft: 84,
              marginTop: 2
            }}
          ></IoniconsIcon>
        </IconRow>
      </Rect>
    </Image>
  );
}

const Image = styled.img`
  display: flex;
  width: 539px;
  height: 853px;
  flex-direction: column;
  margin-top: -41px;
  margin-left: -68px;
`;

const Rect2 = styled.div`
  width: 319px;
  height: 77px;
  background-color: #E6E6E6;
  border-width: 1px;
  border-color: #000000;
  flex-direction: row;
  display: flex;
  margin-top: 30px;
  margin-left: 97px;
  border-style: solid;
`;

const MartinaTarres = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  height: 33px;
  width: 198px;
  font-size: 25px;
`;

const MartinaTarres1 = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  height: 33px;
  width: 198px;
  font-size: 25px;
`;

const MartinaTarres4 = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  height: 33px;
  width: 198px;
  font-size: 25px;
`;

const MartinaTarresStack = styled.div`
  width: 198px;
  height: 33px;
  margin-top: 4px;
  position: relative;
`;

const MartinaTarresStackRow = styled.div`
  height: 40px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 17px;
  margin-left: 57px;
  margin-top: 18px;
`;

const MartinaTarres3 = styled.span`
  font-family: Roboto;
  top: 22px;
  left: 57px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  height: 33px;
  width: 198px;
  font-size: 25px;
`;

const Rect3 = styled.div`
  top: 0px;
  left: 0px;
  width: 319px;
  height: 77px;
  position: absolute;
  background-color: #E6E6E6;
  border-width: 1px;
  border-color: #000000;
  flex-direction: column;
  display: flex;
  border-style: solid;
`;

const MartinaTarres3Stack = styled.div`
  width: 319px;
  height: 77px;
  margin-top: 39px;
  margin-left: 93px;
  position: relative;
`;

const Rect = styled.div`
  width: 375px;
  height: 95px;
  background-color: #E6E6E6;
  flex-direction: row;
  display: flex;
  margin-top: 293px;
  margin-left: 65px;
`;

const IconRow = styled.div`
  height: 58px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 43px;
  margin-left: 49px;
  margin-top: 14px;
`;

export default MyFamily;
