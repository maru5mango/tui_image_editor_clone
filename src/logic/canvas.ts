import { TEST_IMAGE } from "../const";

export function setCanvas(
  $el: HTMLDivElement,
  $canvas: HTMLCanvasElement,
  imgSrc = TEST_IMAGE
) {
  const { width, height } = $el?.getBoundingClientRect();
  $canvas.width = width;
  $canvas.height = height;
  drawImage($canvas, imgSrc);
  return imgSrc;
}

export function drawImage($canvas: HTMLCanvasElement, src: string) {
  const ctx = $canvas.getContext("2d");
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx?.drawImage(img, 0, 0, $canvas.width, $canvas.height);
  };
}

interface canvasDefaultInterface {
  $canvas: HTMLCanvasElement;
  imgSrc: string;
}

interface flipImageInterface extends canvasDefaultInterface {
  direction: flipDirection;
}

type flipDirection = "horizontal" | "vertical";

export function flipImage(drawFlip: flipImageInterface) {
  const { $canvas, imgSrc, direction } = drawFlip;
  const ctx = $canvas.getContext("2d");
  const img = new Image();
  img.src = imgSrc;
  const directionFunc = {
    horizontal: () => {
      ctx?.translate($canvas.width, 0);
      ctx?.scale(-1, 1);
    },
    vertical: () => {
      ctx?.translate(0, $canvas.height);
      ctx?.scale(1, -1);
    },
  };
  img.onload = () => {
    ctx?.save();
    directionFunc[direction]();
    ctx?.drawImage(img, 0, 0, $canvas.width, $canvas.height);
  };
}

export function resetImage(resetCanvas: canvasDefaultInterface) {
  const { $canvas, imgSrc } = resetCanvas;
  const ctx = $canvas.getContext("2d");
  ctx?.restore();
  drawImage($canvas, imgSrc);
}
