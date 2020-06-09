import React, { Component } from "react";
import styled, { css } from "styled-components";

function Login(props) {
  return (
    <Container>
      <Image>
        <Rect>
          <Image2 src={require("../assets/images/logo-lagranja.png")}></Image2>
          <LoremIpsum>El termometro del autoestima</LoremIpsum>
          <LoremIpsum2>Alguien de mi familia ya me ha registrado:</LoremIpsum2>
          <Rect5></Rect5>
          <Rect6></Rect6>
          <Rect4>
            <Entra>¡Entra!</Entra>
          </Rect4>
          <LoremIpsum3>Quiero crear mi propia familia:</LoremIpsum3>
          <Rect2>
            <CreaTuFamilia>¡Crea tu familia!</CreaTuFamilia>
          </Rect2>
        </Rect>
      </Image>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(208,201,201,1);
  border-radius: 12px;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Image = styled.div`
  width: 540px;
  flex-direction: column;
  display: flex;
  flex: 1 1 0%;
  margin-left: -48px;
  height: 100%;
  background-image: url(${require("../assets/images/6bdfee006a5e754ea1a2765ca667d7831.jpg")});
  background-size: cover;
`;

const Rect = styled.div`
  width: 400px;
  height: 812px;
  background-color: rgba(230,230,230,0.63);
  flex-direction: column;
  display: flex;
  margin-left: 23px;
`;

const Image2 = styled.img`
  width: 168px;
  height: 100%;
  margin-top: 113px;
  margin-left: 129px;
  object-fit: contain;
`;

const LoremIpsum = styled.span`
  font-family: Alata;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  height: 122px;
  width: 312px;
  font-size: 43px;
  text-align: center;
  margin-top: 11px;
  margin-left: 58px;
`;

const LoremIpsum2 = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 48px;
  width: 263px;
  font-size: 16px;
  text-align: center;
  margin-top: 21px;
  margin-left: 83px;
`;

const Rect5 = styled.div`
  width: 263px;
  height: 42px;
  background-color: #E6E6E6;
  border-width: 1px;
  border-color: #000000;
  margin-top: 12px;
  margin-left: 83px;
  border-style: solid;
`;

const Rect6 = styled.div`
  width: 263px;
  height: 42px;
  background-color: #E6E6E6;
  border-width: 1px;
  border-color: #000000;
  margin-top: 21px;
  margin-left: 83px;
  border-style: solid;
`;

const Rect4 = styled.div`
  width: 154px;
  height: 52px;
  background-color: #E6E6E6;
  border-radius: 12px;
  border-width: 1px;
  border-color: #000000;
  flex-direction: column;
  display: flex;
  margin-top: 28px;
  margin-left: 137px;
  border-style: solid;
`;

const Entra = styled.span`
  font-family: Helvetica;
  color: #121212;
  height: 25px;
  width: 73px;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  margin-top: 13px;
  margin-left: 41px;
`;

const LoremIpsum3 = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 24px;
  width: 263px;
  font-size: 16px;
  text-align: center;
  margin-top: 51px;
  margin-left: 83px;
`;

const Rect2 = styled.div`
  width: 312px;
  height: 55px;
  background-color: #E6E6E6;
  border-radius: 12px;
  border-width: 1px;
  border-color: #000000;
  flex-direction: column;
  display: flex;
  margin-top: 11px;
  margin-left: 58px;
  border-style: solid;
`;

const CreaTuFamilia = styled.span`
  font-family: Helvetica;
  color: #121212;
  height: 25px;
  width: 175px;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  margin-top: 15px;
  margin-left: 69px;
`;

export default Login;
