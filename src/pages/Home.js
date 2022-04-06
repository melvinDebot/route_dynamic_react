import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000");
        // console.log(Object.keys(data.Rooms.Salon.Sensors).length);
        setPosts(data.rooms);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);


  return (
    <>
      <Container>
        <SubTitle>Mes pièces</SubTitle>
        <ContainerRooms>
          {Object.keys(posts).map((item, i) => {
            return (
              <Link
                key={i}
                to={{
                  pathname: `/room/${posts[item].name}`,
                }}
              >
                <CardRoom>
                  <h4>{posts[item].name}</h4>
                  <h5>
                    View device
                  </h5>
                </CardRoom>
              </Link>
            );
          })}
          <Link to="/add">
            <AddRoom>
              <h4>Add rooms</h4>
            </AddRoom>
          </Link>
        </ContainerRooms>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  padding: 40px 15px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const ContainerRooms = styled.div`
  width: 100%;
  heigh: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const CardRoom = styled.div`
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

const AddRoom = styled.div`
  width: 156px;
  height: 161px;
  background: #2654e3;
  color: white;
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
`;

export default Home;
