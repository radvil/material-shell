export function makePoints(points: Array<(number | string)[]>): string {
  return points.map((point) => point.join(', ')).join(' ');
}
