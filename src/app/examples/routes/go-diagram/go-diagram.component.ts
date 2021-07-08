import { Component, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {
  Diagram,
  GraphObject,
  GraphLinksModel,
  Node,
  Binding,
  Shape,
  TextBlock,
  IncrementalData,
  Palette,
  Adornment,
  Link,
  List,
  ObjectData,
  Overview,
  Panel,
  Point,
  Size,
  Spot,
} from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

@Component({
  selector: 'app-go-diagram',
  templateUrl: './go-diagram.component.html',
  styleUrls: ['./go-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoDiagramComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent!: DiagramComponent;
  @ViewChild('myPalette', { static: true }) public myPaletteComponent!: PaletteComponent;

  // Big object that holds app-level state data
  // As of gojs-angular 2.0, immutability is expected and required of state for ease of change detection.
  // Whenever updating state, immutability must be preserved. It is recommended to use immer for this, a small package that makes working with immutable data easy.
  public state: any = {
    // Diagram state props
    diagramNodeData: [
      { id: 'Alpha', text: 'Alpha', color: 'lightblue' },
      { id: 'Beta', text: 'Beta', color: 'orange' },
      { id: 'Gamma', text: 'Gamma', color: 'lightgreen' },
      { id: 'Delta', text: 'Delta', color: 'pink' },
    ],
    diagramLinkData: [
      { key: -1, from: 'Alpha', to: 'Beta', fromPort: 'r', toPort: '1' },
      { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'b', toPort: 't' },
      { key: -3, from: 'Beta', to: 'Beta' },
      { key: -4, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l' },
      { key: -5, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r' },
    ],
    diagramModelData: { prop: 'value' },
    skipsDiagramUpdate: false,
    selectedNodeData: null, // used by InspectorComponent

    // Palette state props
    paletteNodeData: [
      { key: 'PaletteNode1', color: 'firebrick' },
      { key: 'PaletteNode2', color: 'blueviolet' },
    ],
    paletteLinkData: [
      {
        points: new List().addAll([
          new Point(0, 0),
          new Point(30, 0),
          new Point(30, 40),
          new Point(60, 40),
        ]),
        strokeWidth: 4,
        dash: [6, 3],
      },
      {
        points: new List().addAll([
          new Point(20, 20),
          new Point(60, 20),
          new Point(60, 40),
          new Point(60, 50),
        ]),
      },
    ],
    paletteModelData: { prop: 'val' },
  };

  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';

  public observedDiagram: any = null;

  // currently selected node; for inspector
  public selectedNodeData: ObjectData | null = null;

  public diagramDivClassName: string = 'myDiagramDiv';
  public paletteDivClassName = 'myPaletteDiv';

  // initialize diagram / templates
  initDiagram(): Diagram {
    const $ = GraphObject.make;
    const dia = $(Diagram, {
      'undoManager.isEnabled': true,
      'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
      model: $(GraphLinksModel, {
        nodeKeyProperty: 'id',
        linkToPortIdProperty: 'toPort',
        linkFromPortIdProperty: 'fromPort',
        linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

    const makePort = function (id: string, spot: Spot) {
      return $(Shape, 'Circle', {
        opacity: 0.5,
        fill: 'gray',
        strokeWidth: 0,
        desiredSize: new Size(8, 8),
        portId: id,
        alignment: spot,
        fromLinkable: true,
        toLinkable: true,
      });
    };

    // define the Node template
    dia.nodeTemplate = $(
      Node,
      'Spot',
      {
        contextMenu: $(
          'ContextMenu',
          $(
            'ContextMenuButton',
            $(TextBlock, 'Group'),
            {
              click: function (e, obj) {
                e.diagram.commandHandler.groupSelection();
              },
            },
            new Binding('visible', '', function (o) {
              return o.diagram.selection.count > 1;
            }).ofObject()
          )
        ),
      },
      $(
        Panel,
        'Auto',
        $(
          Shape,
          'RoundedRectangle',
          { stroke: null },
          new Binding('fill', 'color', (c, panel) => {
            return c;
          })
        ),
        $(TextBlock, { margin: 8, editable: true }, new Binding('text').makeTwoWay())
      ),
      // Ports
      makePort('t', Spot.TopCenter),
      makePort('l', Spot.Left),
      makePort('r', Spot.Right),
      makePort('b', Spot.BottomCenter)
    );

    return dia;
  }

  // When the diagram model changes, update app data to reflect those changes. Be sure to use immer's "produce" function to preserve immutability
  diagramModelChange = (changes: IncrementalData) => {
    const diagramNodeData = DataSyncService.syncNodeData(
      changes,
      this.state.diagramNodeData,
      this.observedDiagram?.model
    );
    const diagramLinkData = DataSyncService.syncLinkData(
      changes,
      this.state.diagramLinkData,
      this.observedDiagram?.model
    );
    const diagramModeData = DataSyncService.syncModelData(changes, this.state.diagramModelData);
    const updatedState = {
      skipsDiagramUpdate: true,
      diagramNodeData,
      diagramLinkData,
      diagramModeData,
    };

    this.state = {
      ...this.state,
      ...updatedState,
    };
  };

  initPalette(): Palette {
    const $ = GraphObject.make;
    const palette = $(Palette);

    // define the Node template
    palette.nodeTemplate = $(
      Node,
      'Auto',
      $(
        Shape,
        'RoundedRectangle',
        {
          stroke: null,
        },
        new Binding('fill', 'color')
      ),
      $(TextBlock, { margin: 8 }, new Binding('text', 'key'))
    );

    palette.linkTemplate = $(
      Link,
      {
        // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
        // to line up the Link in the same manner we have to pretend the Link has the same location spot
        locationSpot: Spot.Center,
        selectionAdornmentTemplate: $(
          Adornment,
          'Link',
          { locationSpot: Spot.Center },
          $(
            Shape,
            { isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0 },
            new Binding('strokeDashArray', 'dash')
          ),
          $(
            Shape, // the arrowhead
            { toArrow: 'Standard', stroke: null }
          )
        ),
      },
      {
        routing: Link.AvoidsNodes,
        curve: Link.JumpOver,
        corner: 5,
        toShortLength: 4,
      },
      new Binding('points'),
      $(
        Shape, // the link path shape
        { isPanelMain: true },
        new Binding('strokeDashArray', 'dash')
      ),
      $(
        Shape, // the arrowhead
        { toArrow: 'Standard', stroke: null }
      )
    );

    palette.model = $(GraphLinksModel, {
      linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    });

    return palette;
  }

  initOverview(): Overview {
    const $ = GraphObject.make;
    const overview = $(Overview);
    return overview;
  }

  ngAfterViewInit() {
    if (this.observedDiagram) return;

    this.observedDiagram = this.myDiagramComponent.diagram;

    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', (e) => {
      if (e.diagram.selection.count === 0) {
        this.selectedNodeData = null;
      }

      let selectedNodeData: any = null;
      const node = e.diagram.selection.first();

      if (node instanceof Node) {
        const idx = this.state.diagramNodeData.findIndex((n: any) => n.id == node.data.id);
        selectedNodeData = this.state.diagramNodeData[idx];
      }

      this.state = {
        ...this.state,
        selectedNodeData,
      };
    });
  }

  /**
   * Update a node's data based on some change to an inspector row's input
   * @param changedPropAndVal An object with 2 entries: "prop" (the node data prop changed), and "newVal" (the value the user entered in the inspector <input>)
   */
  public handleInspectorChange(changedPropAndVal: any) {
    const path = changedPropAndVal.prop;
    const value = changedPropAndVal.newVal;

    const selectedNodeData = this.state.selectedNodeData;
    selectedNodeData[path] = value;

    const key = selectedNodeData.id;
    const idx = this.state.diagramNodeData.findIndex((n: any) => n.id == key);
    const diagramNodeData = this.state.diagramNodeData;

    if (idx >= 0) {
      diagramNodeData[idx] = selectedNodeData;

      this.state = {
        ...this.state,
        diagramNodeData,
        skipsDiagramUpdate: false,
      };
    }
  }
}
