import React, { useState, useEffect, useRef } from "react";
import { flipImage, resetImage, setCanvas } from "./logic/canvas";
import "./style/App.css";

function App() {
  const resultDiv = useRef<HTMLDivElement | null>(null);
  const Canvas = useRef<HTMLCanvasElement | null>(null);

  const [LastImgSrc, setLastImgSrc] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");

  const initCanvas = () => {
    const $el = resultDiv.current;
    const $canvas = Canvas.current;
    if (!$el || !$canvas) return;
    const imgSrc = setCanvas($el, $canvas);
    setImgSrc(imgSrc);
    setLastImgSrc(imgSrc);
  };

  useEffect(() => {
    initCanvas();
  }, [resultDiv]);

  useEffect(() => {
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, []);

  function flipXClick() {
    const $canvas = Canvas.current;
    if (!$canvas) return;
    flipImage({
      $canvas,
      imgSrc,
      direction: "horizontal",
    });
  }

  function flipYClick() {
    const $canvas = Canvas.current;
    if (!$canvas) return;
    flipImage({
      $canvas,
      imgSrc,
      direction: "vertical",
    });
  }

  function backFlip() {
    const $canvas = Canvas.current;
    if (!$canvas) return;
    setImgSrc(LastImgSrc);
    resetImage({
      $canvas,
      imgSrc: LastImgSrc,
    });
  }

  return (
    <main>
      <header>
        <div className="logo">MU EDITOR</div>
        <div className="btnDiv">
          <button type="button" className="loadBtn">
            Load
          </button>
          <button type="button" className="downloadBtn">
            Download
          </button>
        </div>
      </header>
      <section className="result">
        <div className="image" ref={resultDiv}>
          <canvas id="result" ref={Canvas}></canvas>
        </div>
        <ul className="subMenu">
          <li>
            <button
              type="button"
              className="flipX"
              onClick={() => flipXClick()}
            >
              flip X
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flipY"
              onClick={() => flipYClick()}
            >
              flip y
            </button>
          </li>
          <li>
            <button type="button" className="back" onClick={() => backFlip()}>
              back
            </button>
          </li>
        </ul>
      </section>
      <ul className="menu">
        <li>
          <button type="button" className="flip selected">
            flip
          </button>
        </li>
        <li>
          <button type="button" className="rotate">
            rotate
          </button>
        </li>
      </ul>
    </main>
  );
}

export default App;
