import { Component, Input } from '@angular/core';
import { NodeDimension, NodePosition } from '@swimlane/ngx-graph';
import { RaxNodeComponent, RaxNodeStyle } from 'src/app/common/flowchart';
import { makePoints } from '../utils/make-points';

@Component({
  selector: '[nodeMerge]',
  template: `
    <svg:polygon
      [attr.fill]="nodeStyle.backgroundColor"
      [attr.stroke]="nodeStyle.border"
      [attr.stroke-width]="nodeStyle.borderWidth"
      [attr.points]="getPoints()"
    />
    <svg:text
      [attr.font-size]="nodeStyle.fontSize"
      [attr.font-family]="nodeStyle.fontFamily"
      [attr.fill]="nodeStyle.color"
      [attr.x]="dimension.width / 2 + position.x + nodeStyle.borderWidth!"
      [attr.y]="dimension.height / 3 + position.y + nodeStyle.borderWidth!"
      [attr.text-anchor]="nodeStyle.textAlign"
    >
      {{ label }}
    </svg:text>
  `,
  preserveWhitespaces: true,
})
export class NodeShapeMerge implements RaxNodeComponent {
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
    const points = [
      [0, 0],
      [this.dimension.width, 0],
      [this.dimension.width / 2, this.dimension.height],
    ];
    return makePoints(points);
  }
}
