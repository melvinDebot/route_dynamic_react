import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow.png";

const Post = () => {
  const { id } = useParams();
  let history = useHistory();
  const [post, SetPost] = useState({});

  const [sensors, SetSensors] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/room/${id}`);
        console.log('MELVIN', data)
        // console.log(Object.keys(data.Sensors));
        SetPost(data);
        
        SetSensors(data.sensors)
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const DeleteRoom = () => {
    axios.delete(`http://localhost:3000/room/${id}`).then(res => {
      console.log("data", res.data);
      history.push('/')
    })
    console.log('delete room')
  }

  return (
    <Container>
      <ButtonBack onClick={() => history.goBack()}>
        {" "}
        <img src={arrow} alt="" />{" "}
      </ButtonBack>
      <h3>{post.name}</h3>
      <ContainerSensors>
        {
          Object.keys(sensors).map((item, i) => {
          return (
            <Link
              key={i}
              to={{
                pathname: `/sensor/${Object.keys(sensors)[i]}`,
              }}
            >
              <CardSensors>{Object.keys(sensors)[i]}</CardSensors>
            </Link>
          );
        })
        }
      </ContainerSensors>
      <ButtonDelete onClick={DeleteRoom}>DELETE ROOM</ButtonDelete>
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

const ContainerSensors = styled.div`
  width: 100%;
  heigh: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const ButtonDelete = styled.button`
  width: 100%;
  height: 46px;
  color: white;
  background: #E56441;
  border: none;
  border-radius: 7px;
  margin-top: 20px;
`;

const CardSensors = styled.div`
  width: 156px;
  height: 161px;
  background: #f1f5fe;
  border-radius: 7px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h4 {
    font-size: 14px;
    font-weight: 600;
  }
  h5 {
    font-weight: 500;
  }
`;


export default Post;
