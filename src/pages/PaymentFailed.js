import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  

  return (
    <StyledBox>
      <div>
   
        <TextStyle>Payment Failed </TextStyle>
        <Link to="/dashboard"><Button varient="dark" >Go to Dashboard</Button></Link>
       
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  width: 50%;
  text-align: center;
  margin: 5% auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px black;
`;
const TextStyle = styled.div`

  background-color: red;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
  color: #fff;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
`;
const ListContainer = styled.ul`
  /* display: flex; */
  width: 60%;
  justify-content: center;
  margin: 0px auto;
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  /* width: 50%; */
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 10px 10px;
`;

export default PaymentFailed;
