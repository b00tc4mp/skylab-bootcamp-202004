import React, { Component } from "react";
import styled, { css } from "styled-components";

function Landing(props) {
  return (
    <Container>
      <Image>
        <Rect>
          <LoremIpsum>El termometro emocional</LoremIpsum>
          <LoremIpsum2>
            La forma más sencilla y divertida de mostrar cómo nos sentimos!
          </LoremIpsum2>
        </Rect>
      </Image>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(208,201,201,1);
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Image = styled.div`
  width: 540px;
  flex-direction: column;
  display: flex;
  flex: 1 1 0%;
  margin-left: -25px;
  height: 100%;
  background-image: url(${require("../assets/images/6bdfee006a5e754ea1a2765ca667d7831.jpg")});
  background-size: cover;
`;

const Rect = styled.div`
  width: 312px;
  height: 245px;
  background-color: rgba(230,230,230,0.53);
  flex-direction: column;
  display: flex;
  margin-top: 139px;
  margin-left: 61px;
`;

const LoremIpsum = styled.span`
  font-family: Alata;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  height: 118px;
  width: 284px;
  font-size: 43px;
  text-align: center;
  margin-left: 14px;
`;

const LoremIpsum2 = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  text-align: center;
  width: 284px;
  height: 99px;
  font-size: 23px;
  margin-top: 15px;
  margin-left: 14px;
`;

export default Landing;
