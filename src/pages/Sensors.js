import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import arrow from "../assets/arrow.png";


const Sensors = () => {
  const { id } = useParams();
  const { name } = useParams();
  let history = useHistory();
  const [post, SetPost] = useState([]);

  const [sensorSettings, setSensorsSettings] = useState([])

  const [systemSettings, setSystemSetting] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/sensor/${name}`
        );
        console.log("POSTS", data);
        setSystemSetting(data.system_settings);
        setSensorsSettings(data.sensor_settings);
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
      <h3>{systemSettings.sensor_name}</h3>
      <ContainerSensors>
        <ContainerData>
          <h4>{sensorSettings.sensor_type}</h4>
          <div>
            <h4>Humidité</h4>
            <h4>{sensorSettings.current_hum}</h4>
          </div>
          <div>
            <h4>Temperature</h4>
            <h4>{sensorSettings.current_temp}</h4>
          </div>
        </ContainerData>
      </ContainerSensors>
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
