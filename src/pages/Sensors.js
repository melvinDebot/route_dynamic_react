import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import arrow from "../assets/arrow.png";


const Sensors = () => {
  const { id } = useParams();
  const { name } = useParams();
  let history = useHistory();

  
  const [isActiveTemp, setIsActiveTemp] = useState(true)
  const [isActiveHum, setIsActiveHum] = useState(true)
  const [isShow, setIsShow] = useState(false)

  const [nameRoom, setRoom] =  useState("")

  const [post, setPost] = useState([]);
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

        setPost(data)
        console.log("NEW ARRAY", post.sensor_settings.is_hum);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, []);

  const updateRoom = (data) => {
    console.log("UPDATE_ROOM", post)


    if (data === "Hum") {
      setIsActiveHum((current) => !current);
      post.sensor_settings.is_hum = isActiveHum;
    }
    else if (data === "Temp") {
      setIsActiveTemp((current) => !current);
      post.sensor_settings.is_temp = isActiveTemp;
    }

    axios.patch(`http://localhost:3000/sensor/${name}`, post).then((res) => {
      console.log(res);

      console.log(res.data);
    });
  }

  const moveSensors = (event) => {
    setRoom(event.target.value);
    console.log("event", event.target.value,);
    post.system_settings.room_name = event.target.value;
    
  }

  const test = () => {
    console.log(nameRoom, post.system_settings.room_name);
    axios.patch(`http://localhost:3000/sensor/${name}`, post).then((res) => {
      console.log(res);

      console.log(res.data);
      history.push("/");
    });
  }

  const showPopup = () => {
    console.log("ise show", isShow)
    setIsShow(true);
  }


  return (
    <Container>
      {isShow ? (
        <LayerPopup >
          <Popup>
            <label>Nom de la piece</label>
            <Input placeholder="Salon" onChange={(e) => moveSensors(e)} />
            <ButtonMove onClick={() => test()}>Changer</ButtonMove>
          </Popup>
        </LayerPopup>
      ) : (
        ""
      )}
      <ButtonBack onClick={() => history.goBack()}>
        <img src={arrow} alt="" />
      </ButtonBack>
      <h3>{systemSettings.sensor_name}</h3>
      <ContainerSensors>
        <h4>{sensorSettings.sensor_type}</h4>
        <ContainerData>
          <div
            onClick={() => updateRoom("Hum")}
            style={
              isActiveHum ? { background: "white" } : { background: "#D3D3D3" }
            }
          >
            <h4>Humidité</h4>
            <h4>{sensorSettings.current_hum}</h4>
            <h5>{isActiveHum ? "Active" : "Disabled"}</h5>
          </div>
          <div
            onClick={() => updateRoom("Temp")}
            style={
              isActiveTemp ? { background: "white" } : { background: "#D3D3D3" }
            }
          >
            <h4>Temperature</h4>
            <h4>{sensorSettings.current_temp}</h4>
            <h5>{sensorSettings.isHum ? "Active" : "Disabled"}</h5>
          </div>
        </ContainerData>
      </ContainerSensors>
      <ButtonMove onClick={() => showPopup()}>Deplacer le capteurs</ButtonMove>
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

const Input = styled.input`
  width: 298px;
  height: 46px;
  background: #f1f5fe;
  border-radius: 7px;
  border: none;
  margin-top: 10px;
  font-size: 16px;
  padding-right: 6px;
`;

const ButtonMove = styled.button`
  width: 100%;
  height: 46px;
  color: white;
  background: orange;
  border: none;
  border-radius: 7px;
  margin-top: 20px;
`;

const LayerPopup = styled.div`
  width: 100%;
  height: 95vh;
  background: rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Popup = styled.div`
  width: 338px;
  height: 202px;
  background: white;
  position: absolute;
  border-radius: 7px;
  text-align: center;
  padding: 20px;
`;


const ContainerData = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
  div{
    background: white;
    width: 135px;
    height: 100px;
    border-radius: 5px;
    text-align: center;
    h5{
      color: grey;
      margin-top: 7px;
    }
  }

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
