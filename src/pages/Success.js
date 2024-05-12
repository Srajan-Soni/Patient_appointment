import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();
  const recieved = JSON.stringify(state?.data);
  const info = JSON.parse(recieved);
  const { id, fullname, email, phone, event } = info;

  return (
    <StyledBox>
      <div>
    <h1>Hey  {fullname}</h1>
        <TextStyle>Thank you for registering! You can Login now</TextStyle>
        <Link to="/"><Button varient="primary" >Login</Button></Link>
       
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  width: 50%;
  text-align: center;
  margin: 5% auto;
  padding: 50px;
  background-color: #f4f4f4;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px green;
`;
const TextStyle = styled.div`

  background-color: darkblue;
  width: 50%;
  margin: 50px auto;
  /* margin-top: 20px; */
  margin-bottom: 20px;
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

export default Success;
