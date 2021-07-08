import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-inspector',
  template: `
    <div *ngIf="nodeData" id="myInspectorDiv">
      <table>
        <tbody>
          <tr *ngFor="let entry of nodeData | keyvalue">
            <app-inspector-row
              *ngIf="entry.key !== 'id'"
              [id]="entry.key"
              [value]="entry.value"
              (onInputChangeEmitter)="onInputChange($event)"
            ></app-inspector-row>
          </tr>
        </tbody>
      </table>
    </div>

    <div *ngIf="!nodeData">Select a Node to use Inspector</div>
  `,
  styles: [
    `
      * {
        padding: 5px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        margin: 10px;
        width: fit-content;
      }

      form {
        background: lightgray;
        border: 1px solid black;
      }

      input {
        clear: both;
        display: inherit;
        float: initial;
        font-weight: 300;
        border-radius: 10px;
        background: white;
      }

      input:focus {
        border-radius: 10px;
        outline: none;
      }
    `,
  ],
})
export class InspectorComponent {
  @Input()
  public nodeData!: go.ObjectData;

  @Output()
  public onInspectorChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  public onInputChange(propAndValObj: any) {
    this.onInspectorChange.emit(propAndValObj);
  }
}
