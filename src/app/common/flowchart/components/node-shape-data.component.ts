import { Component, Input } from '@angular/core';
import { NodeDimension, NodePosition } from '@swimlane/ngx-graph';
import { RaxNodeComponent, RaxNodeStyle } from '../interfaces/flowchart-data.interface';
import { makePoints } from '../utils/make-points';

@Component({
  selector: '[nodeData]',
  template: `
    <svg:polygon
      [attr.fill]="nodeStyle.backgroundColor"
      [attr.stroke]="nodeStyle.border"
      [attr.stroke-width]="nodeStyle.borderWidth"
      [attr.points]="getPoints()"
    />
    <!-- [attr.transform]="'translate(' + -position.y + ',' + -position.x + ')'" -->
    <svg:text
      [attr.font-size]="nodeStyle.fontSize"
      [attr.font-family]="nodeStyle.fontFamily"
      [attr.fill]="nodeStyle.color"
      [attr.x]="dimension.width / 2 + position.x + nodeStyle.borderWidth!"
      [attr.y]="dimension.height / 2 + position.y + nodeStyle.borderWidth!"
      [attr.text-anchor]="nodeStyle.textAlign"
    >
      {{ label }}
    </svg:text>
  `,
})
export class NodeShapeData implements RaxNodeComponent {
  @Input() label: string = 'Default Text';

  @Input() position: NodePosition = { x: 0, y: 0 };

  @Input() dimension: NodeDimension = { width: 200, height: 150 };

  private _nodeStyle: RaxNodeStyle = {
    color: '#666',
    fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'middle',
    backgroundColor: 'white',
    border: '#666',
    borderWidth: 2,
  };
  @Input()
  set nodeStyle(newStyle: RaxNodeStyle) {
    this._nodeStyle = { ...this._nodeStyle, ...newStyle };
  }
  get nodeStyle(): RaxNodeStyle {
    return this._nodeStyle;
  }

  getPoints(): string {
    // sample position { x: 0, y: 0 }
    // sample dimension { width: 200, height: 150 }
    // 50,75 225,75 200,175 25,175 // clockwise
    const startX = 0 + this.position.x;
    const startY = 0 + this.position.y;
    const endX = this.dimension.width + this.position.x; // 200
    const endY = this.dimension.height + this.position.y; // 150
    const gap = 25;

    const points = [
      [startX + gap, startY],
      [endX, startY],
      [endX - gap, endY],
      [startX, endY],
    ];
    return makePoints(points);
  }
}
