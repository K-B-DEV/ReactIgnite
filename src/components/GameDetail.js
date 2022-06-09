import React from "react";
//Styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Router
import { Link } from "react-router-dom";
//Function
import { smallImage } from "../util";
//Images
import playstation from "../images/playstation.svg";
import steam from "../images/steam.svg";
import xbox from "../images/xbox.svg";
import nintendo from "../images/nintendo.svg";
import apple from "../images/apple.svg";
import gamepad from "../images/gamepad.svg";
//Stars
import starEmpty from "../images/star-empty.png";
import starFull from "../images/star-full.png";

const GameDetail = ({ pathId }) => {
  const history = useHistory();
  //Exit Detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };
  //Get platform images
  const getPlatform = (platform) => {
    switch (platform) {
      case "Playstation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };
  //Get stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };
  //Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);
  console.log(typeof pathId + " " + pathId);
  return (
    <>
      {!isLoading && (
        // <Link to={`/`}>
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <Stats>
              <StyledTitle>
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
              </StyledTitle>
              <StyledRating className="rating">
                <p>Rating: {game.rating}</p>
                {getStars()}
              </StyledRating>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms &&
                    game.platforms.map((data) => (
                      <img
                        title={data.platform.name}
                        alt={data.platform.name}
                        key={data.platform.id}
                        src={getPlatform(data.platform.name)}
                      />
                    ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt={game.background_image}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results &&
                screen.results.map((screen) => (
                  <img
                    src={smallImage(screen.image, 1280)}
                    key={screen.id}
                    alt={screen.image}
                  />
                ))}
            </div>
          </Detail>
        </CardShadow>
        // </Link>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100vw;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: red;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  /* padding: 1rem 20rem; */
  padding: 1rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 999;
  img {
    width: 100%;
  }
  @
`;

const Stats = styled(motion.div)`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  } */
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 4fr;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }

  @media (max-width: 420px) {
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

const StyledTitle = styled(motion.div)`
  grid-row: 1/2;
  grid-column: 1/3;
  align-self: center;
  justify-self: start;

  @media (max-width: 420px) {
    grid-row: 1/2;
    grid-column: 1/2;
    align-self: center;
    justify-self: center;
  }
`;

const StyledRating = styled(motion.div)`
  grid-row: 1/2;
  grid-column: 2/3;
  align-self: center;
  justify-self: end;
  @media (max-width: 420px) {
    grid-row: 2/3;
    grid-column: 1/2;
    align-self: center;
    justify-self: center;
  }
`;

const Info = styled(motion.div)`
  /* text-align: center; */
  grid-row: 2/3;
  grid-column: 1/3;
  align-self: center;
  justify-self: start;
  @media (max-width: 420px) {
    grid-row: 3/4;
    grid-column: 1/2;
    justify-self: center;
  }

  align-items: center;
  justify-items: start;
`;

const Platforms = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto;
  grid-auto-flow: column;
  /* column-gap: 15%; */
  align-items: center;
  justify-items: center;
  /* width: 100%;
  display: flex;
  justify-content: space-evenly; */
  img {
    width: 100%;
    /* margin-left: 3rem; */
  }
  @media (max-width: 420px) {
    img {
      width: 100%;
    }
  }
`;
const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;
