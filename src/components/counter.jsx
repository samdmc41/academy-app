import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import Popup from "./Popup";

const RandNum = Math.random();
export default function Dynamic() {
  const [playerData, setPlayerData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://nba-players.herokuapp.com/players-stats"
      );
      const nbaData = await response.json();
      setPlayerData(nbaData.slice(20, 24));
    };
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const myStyle = {
    backgroundImage: "url('https://picsum.photos/1000?random=20')",
    height: "100vh",
    marginTop: "-10px",
    fontSize: "12px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Container style={myStyle}>
      <Row>
        {playerData.map((playerData, k) => (
          <Col key={k} xs={12} md={4} lg={3}>
            <Card>
              <Card.Img
                src={"https://picsum.photos/500?random=" + Math.random()}
              />
              <Card.Body className="align-middle justify-content center">
                <Card.Title>{playerData.name}</Card.Title>
                <Card.Text>{playerData.team_name}</Card.Text>
                <input
                  type="button"
                  className="btn btn-secondary btn-md bg-primary"
                  value="More Info is here"
                  onClick={togglePopup}
                />
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <p>{"Games Played: " + playerData.games_played}</p>
                        <p>{"Minutes/Game: " + playerData.minutes_per_game}</p>
                        <p>{"Points/Game: " + playerData.points_per_game}</p>
                        <p>{"Blocks/Game: " + playerData.blocks_per_game}</p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
