import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


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
      <ButtonBack onClick={() => history.goBack()}> ^ </ButtonBack>
      <h1>{ post}</h1>
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
`;

// const ContainerSensors = styled.div`
//   width: 100%;
//   heigh: auto;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: space-between;
// `;

// const CardSensors = styled.div`
//   width: 156px;
//   height: 161px;
//   background: #f1f5fe;
//   border-radius: 7px;
//   margin-top: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   h4 {
//     font-size: 14px;
//     font-weight: 600;
//   }
//   h5 {
//     font-weight: 500;
//   }
// `;

export default Sensors;
