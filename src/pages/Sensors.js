import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import arrow from "../assets/arrow.png";


const Sensors = () => {
  const { id } = useParams();
  const { name } = useParams();
  let history = useHistory();
  const [post, SetPost] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/rooms/${id}/sensor/${name}`
        );
        console.log(data);
        SetPost(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  return (
    <Container>
      <ButtonBack onClick={() => history.goBack()}>
        <img src={arrow} alt="" />
      </ButtonBack>
      <h3>{post.Name}</h3>
      <ContainerSensors>
        <h4>{post.SensorType}</h4>
        <ContainerData>
          <div>
            <h4>Position</h4>
            <h4>{post.Position}</h4>
          </div>
          <div>
            <h4>Id</h4>
            <h4>{post.id}</h4>
          </div>
        </ContainerData>
      </ContainerSensors>
      {/* 
      <h3>{post.Name}</h3>
      <ContainerSensors>
        {Object.keys(sensors).map((item, i) => {
          return (
            <Link key={i}>
              <CardSensors>{sensors[item].Name}</CardSensors>
            </Link>
          );
        })}
      </ContainerSensors> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  padding: 0px 15px;
  position: relative;
  h3 {
    font-weight: 500;
    font-size: 27px;
    margin-top: 20px;
  }
`;

const ContainerSensors = styled.div`
  width: 100%;
  height: auto;
  background: #f1f5fe;
  border-radius: 7px;
  padding: 20px 10px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  h4 {
    font-weight: 600;
    font-size: 18px;
    margin-top: 10px;
  }
`;

const ContainerData = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;

`;

const ButtonBack = styled.button`
  width: 65px;
  height: 65px;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: #f1f5fe;
  border: none;
  &:active {
    background: #bed2ff;
  }
`;



export default Sensors;
