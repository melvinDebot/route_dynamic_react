import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import arrow from "../assets/arrow.png";


const AddRoom = () => {
  let history = useHistory();

  const dataInit = {
    nameRoom: "",
    sizeRoom: ""
  }

  const [room, setRoom] = useState(dataInit);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    setRoom({ ...room, [name]: value });
  };


  const createRoom = () => {
    const fakeRoom = {
      name: room.nameRoom,
      sensors: {
        ESP_Chambre_01: {
          system_settings: {
            sensor_name: "ESP_Chambre_01",
            room_name: "Chambre",
            position: "Fenêtre nord",
            etage: 1,
            username: "admin",
            status: "running",
            current_timezone: "CET-1CEST,M3.5.0,M10.5.0/3",
            timezones: [
              "CET-1CEST,M3.5.0,M10.5.0/3",
              "PST8PDT",
              "EST5EDT",
              "JST-9",
            ],
            version: "0.0.3",
            chip_id: 42,
            flash_chip_id: 42,
            flash_chip_size: 42,
            flash_chip_real_size: 42,
            free_heap: 42,
          },
          sensor_settings: {
            sensor_type: "DHT22",
            sensor_pin: 5,
            sensor_delay: 60,
            is_hum: true,
            is_temp: true,
            is_allowed: true,
            current_temp: 17.2,
            current_hum: 52.6,
          },
          influxdb_config: {
            influxdb_url: "http://192.168.1.3:8086",
            influxdb_token: "aToken",
            influxdb_org: "Ynov",
            influxdb_bucket: "Paris",
            status: "Configured and connected",
            is_connected: true,
          },
          network_settings: {
            ssid: "WiFI",
            ip: "192.168.1.100",
            api_port: 5565,
            mac: "ef:re:sd:gf:az",
            gateway: "192.168.1.255",
            subnet_mask: "255.255.255.255",
            signal_strengh: -32,
          },
        },
      },
      area: parseInt(room.sizeRoom, 10)
    };


    axios.post(`http://localhost:3000/room`, fakeRoom).then((res) => {
      console.log(res);

      console.log(res.data);
      history.push("/")
    });

    console.log(fakeRoom);
    
  }



  return (
    <Container>
      <ButtonBack onClick={() => history.goBack()}> <img src={arrow} alt="" /> </ButtonBack>
      <h4>Ajout d'une pièce</h4>
      <ContainerInput>
        <label htmlFor="nameRoom">Nom pièce</label>
        <Input
          type="text"
          value={room.nameRoom}
          onChange={handleInputChange}
          name="nameRoom"
          placeholder="cuisine"
        />
      </ContainerInput>
      <ContainerInput>
        <label htmlFor="sizeRoom">Taille de la pièce</label>
        <Input
          type="text"
          value={room.sizeRoom}
          onChange={handleInputChange}
          name="sizeRoom"
          id="sizeRoom"
          placeholder="10m2"
        />
      </ContainerInput>
      <ButtonSubmit onClick={createRoom}>CRÉER</ButtonSubmit>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  padding: 0px 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  h4 {
    font-weight: 600;
    font-size: 20px;
    text-align: center;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 52px;
  background: #f1f5fe;
  border-radius: 7px;
  margin-top: 5px;
  border: none;
  padding-left: 5px;
`;

const ContainerInput = styled.div`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

const ButtonBack = styled.button`
  width: 65px;
  height: 65px;
  position: relative;
  top: 0;
  left: -9rem;
  border-radius: 50%;
  background: #f1f5fe;
  border: none;
  &:active {
    background: #BED2FF;
  }
`;

const ButtonSubmit = styled.button`
  width: 100%;
  height: 54px;
  background: #2654e3;
  border-radius: 7px;
  color: white;
  font-weight: 600;
  font-size: 20px;
  border:none;
  margin-top: 30px;
  text-align: center;
`;

export default AddRoom;