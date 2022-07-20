import React, {useEffect, useState} from 'react';
import './App.css';
import { writePolygon } from './canvasRenderer';
import {Button, TextareaAutosize} from '@mui/material';
import {normalizePolygon, Polygon} from './Polygon';
import {Options, RendererOptions} from './Options';



function App() {
  const defaultPolygon: Polygon = {
    hole: [
      {
        hole: [],
        points: [
          {x: 30, y: 10},
          {x: 40, y: 10},
          {x: 40, y: 20},
          {x: 30, y: 20},
        ]
      },
      {
        hole: [],
        points: [
          {x: 30, y: 30},
          {x: 40, y: 30},
          {x: 40, y: 40},
          {x: 30, y: 40},
        ]
      }
    ],
    points: [
      {x: 0, y: 0},
      {x: 50, y: 0},
      {x: 50, y: 50},
      {x: 0, y: 50},
    ]
  };
  const [statusMessage,setStatusMessage] = useState<string>("Hello World");
  const [canvasCtx,setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [polygon, setPolygon] = useState<Polygon | null>(normalizePolygon(defaultPolygon,800,800));
  const [rendererOptions,setRendererOptions] = useState<RendererOptions>({
    showInnerOrOuterLabel: false,
    showPositionLabel: false,
    showVerticesIndexLabel: false
  });

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    setCanvasCtx(ctx);
    if (!ctx) return;
    // yが上になるように
    ctx.font = "20px serif";
    ctx.save();
  },[])


  const handleValueChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value as string;
    let typed: Polygon;
    try {
      typed = JSON.parse(value);
      const converted = normalizePolygon(typed!,800,800);
      setPolygon(converted);
    } catch (e) {
      setStatusMessage(e as string);
    }
    setStatusMessage("ok");
  }

  return (
    <div className="App">
      <div className="Left-Element">
        <p>
          {statusMessage}
        </p>
        <Options onChange={(v) => {
          setRendererOptions(v);
          console.log(rendererOptions);
        }} defaultValues={{
          showInnerOrOuterLabel: false, showPositionLabel: false, showVerticesIndexLabel: false
        }} />
        <TextareaAutosize
          maxRows="1000"
          aria-label="play-string"
          defaultValue={JSON.stringify(defaultPolygon)}
          onChange={handleValueChange}
          style={{ width: 400,marginTop: 20 }}
        />
        <Button onClick={() => writePolygon(canvasCtx!,polygon!,rendererOptions)}>
          Go
        </Button>
      </div>
      <div className="Right-Element">
        <p> result space </p>
        <canvas className="Canvas" id="canvas" height="800" width="800" />
      </div>
    </div>
  );
}

export default App;
