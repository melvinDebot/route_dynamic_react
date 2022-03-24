import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";


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
      Name: room.nameRoom,
      Sensors: {
        sensor08: {
          id: "08",
          Name: "ESP_Salon_08",
          SensorType: "DHT22",
          Temperature: false,
          Humidity: true,
          Position: "Mi droite",
          IPAddress: "192.170.1.28",
          MACAddress: "80:7D:3A:F3:9A:E1",
          Delay: 6000,
          Allowed: true,
        },
      },
      Area: room.sizeRoom,
    };


    axios.post(`http://localhost:9000/rooms`,  fakeRoom ).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    history.push("/")
  }



  return (
    <Container>
      <ButtonBack onClick={() => history.goBack()}> <BsFillArrowLeftCircleFill /> </ButtonBack>
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