import {Polygon, Vector2} from './Polygon';
import {RendererOptions} from './Options';

const baseColor = 'black';
const colors = ['red','purple','lime','yellow', 'aqua','orange']
export const writePolygon = (ctx: CanvasRenderingContext2D,polygon: Polygon,rendererOptions: RendererOptions) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < polygon.points.length; i++) {
    const i2 = (i + 1) % polygon.points.length;
    let text = '';
    if (rendererOptions.showInnerOrOuterLabel) text += 'o ';
    if (rendererOptions.showVerticesIndexLabel) text += `p${i} `;
    if (rendererOptions.showPositionLabel) text += `(${polygon.points[i].x},${polygon.points[i].y})`;
    writePointText(ctx,polygon.points[i].x,polygon.points[i].y,text,baseColor);
    writeLine(ctx,polygon.points[i],polygon.points[i2],baseColor);
  }
  for (let i = 0;i < polygon.hole.length; i++) {
    const color = colors[i];
    const holePoly = polygon.hole[i];
    for (let j = 0; j < holePoly.points.length; j++) {
      let holeStr = '';
      if (rendererOptions.showInnerOrOuterLabel) holeStr += 'i ';
      if (rendererOptions.showVerticesIndexLabel) holeStr += `p${j} `;
      if (rendererOptions.showPositionLabel) holeStr += `(${holePoly.points[j].x},${holePoly.points[j].y})`;
      const j2 = (j + 1) % holePoly.points.length;
      writePointText(ctx,holePoly.points[j].x,holePoly.points[j].y,holeStr,color);
      writeLine(ctx,holePoly.points[j],holePoly.points[j2],color);
    }
  }
};

export const writeLine = (ctx: CanvasRenderingContext2D,from: Vector2,to: Vector2, color: string) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(from.x + 200,ctx.canvas.width - from.y - 200);
  ctx.lineTo(to.x + 200,ctx.canvas.width - to.y - 200);
  ctx.closePath();
  ctx.stroke();
}

export const writePoint = (ctx: CanvasRenderingContext2D,x: number, y: number,helperText: string,color: string) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillText(`${helperText}:\n(${x},${y})`, x+170, (ctx.canvas.width - y)-220);
  ctx.arc(x+200, ctx.canvas.width - y - 200, 3, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.moveTo(x,y);
};

export const writePointText = (ctx: CanvasRenderingContext2D,x: number, y: number,text: string,color: string) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillText(text, x+170, (ctx.canvas.width - y)-220);
  ctx.arc(x+200, ctx.canvas.width - y - 200, 3, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.moveTo(x,y);
};
