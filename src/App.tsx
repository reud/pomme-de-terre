import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {writePoint, writePolygon} from './canvasRenderer';
import {Button, TextareaAutosize} from '@mui/material';
import {normalizePolygon, Polygon} from './Polygon';



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
  const [originPolygon, setOriginPolygon] = useState<Polygon | null>(defaultPolygon);


  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    setCanvasCtx(ctx);
    const converted = normalizePolygon(polygon!,800,800);
    setPolygon(converted!);
    if (!ctx) return;
    // yが上になるように
    ctx.font = "20px serif";
    ctx.save();
  },[])

  useEffect(() => {
    if (!canvasCtx) return;
    console.log(polygon);
  },[canvasCtx]);

  const handleValueChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value as string;
    let typed: Polygon;
    try {
      typed = JSON.parse(value);
      const converted = normalizePolygon(typed!,800,800);
      setPolygon(converted);
      setOriginPolygon(typed);
    } catch (e) {
      setStatusMessage(e as string);
    }
    setStatusMessage("ok");
  }

  return (
    <div className="App">
      <div className="Left-Element">
        <p>
          Input Field
        </p>
        <TextareaAutosize
          maxRows="1000"
          aria-label="play-string"
          defaultValue={JSON.stringify(defaultPolygon)}
          onChange={handleValueChange}
          style={{ width: 400 }}
        />
        <Button onClick={() => writePolygon(canvasCtx!,polygon!,originPolygon!)}>
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
