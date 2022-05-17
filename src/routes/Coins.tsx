import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.darkColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  a {
    align-items: center;
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  width: 400px;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CheckBoxWrapper = styled.div`
  margin: 0px 0px 0px 10px;
  position: relative;
  display: flex;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${(props) => props.theme.accentColor};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const changeTheme = () => {
    setDarkAtom((cur) => !cur);
  };

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <CheckBoxWrapper>
          <CheckBox id="checkbox" type="checkbox" onClick={changeTheme} />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
