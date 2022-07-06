

export interface Vector2 {
  x: number,
  y: number
}

export interface Polygon {
  points: Vector2[],
  hole: Polygon[]
}

export const normalizePolygon = (polygon: Polygon, width: number, height: number) => {
  const basePoint = {x: 1000000,y: 1000000};
  polygon.points.forEach(v => {
    if (basePoint.x > v.x) basePoint.x = v.x;
    if (basePoint.y > v.y) basePoint.y = v.y;
  })
  const points = polygon.points;
  // 左下を0,0として合わせる
  const fixedPoint = points.map(v => {
    return {
      x: v.x - basePoint.x,
      y: v.y - basePoint.y
    }
  });


  let left = 1000000;
  let right = 0;
  let down = 1000000;
  let up = 0;
  fixedPoint.forEach(v => {
    left = v.x < left ? v.x : left;
    right = v.x > right ? v.x : right;
    down = v.y < down ? v.y : down;
    up = v.y > up ? v.y : up;
  });

  // rect
  const horizontal = right - left;
  const vertical = up - down;

  const isHorizontal = horizontal > vertical;
  const mag = 400 / (isHorizontal ? horizontal : vertical);
  console.log('mag: ',mag,' horizontal: ', horizontal,' vertical: ',vertical);

  const results:Polygon = {
    hole: [], points: []
  };

  results.points = fixedPoint.map(v => {
      return {x:  v.x * mag, y: v.y * mag};
  } );
  results.hole = polygon.hole.map(poly => {
    const points = poly.points;
    const fixed = points.map(v => {
      return {
        x: (v.x - basePoint.x) * mag,
        y: (v.y - basePoint.y) * mag
      }
    });
    return {points: fixed, hole: []};
  })
  return results;
}
