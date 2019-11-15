import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
const TILE_SIZE = 48;
const FIELD_ROW = 16;
const FIELD_COLUMN = 20;

function GameCanvas() {
  const fillBackground = { backgroundImage: "url(field.png)" };

  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const spiderman = new Image();
    spiderman.src = "spiderman-main.png";
    spiderman.onload = () =>
      ctx.drawImage(
        spiderman,
        TILE_SIZE,
        0,
        TILE_SIZE,
        TILE_SIZE,
        0,
        0,
        TILE_SIZE,
        TILE_SIZE
      );

    const mysterio = new Image();
    mysterio.src = "mysterio.png";
    mysterio.onload = () =>
      ctx.drawImage(
        mysterio,
        TILE_SIZE,
        0,
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        0,
        TILE_SIZE,
        TILE_SIZE
      );

    const rocket = new Image();
    rocket.src = "rocketraccoon.png";
    rocket.onload = () =>
      ctx.drawImage(
        rocket,
        TILE_SIZE,
        0,
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE * 2,
        0,
        TILE_SIZE,
        TILE_SIZE
      );
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={fillBackground}
      width={TILE_SIZE * FIELD_COLUMN}
      height={TILE_SIZE * FIELD_ROW}
    />
  );
}

function App() {
  return (
    <div className="App">
      <GameCanvas />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);