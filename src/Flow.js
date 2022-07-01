import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  useEdgesState,
  useNodesState,
  Controls,
  Background,
  MarkerType,
} from "react-flow-renderer";
import {Box, Button, Grid} from '@material-ui/core'
import ButtonEdge from './ButtonEdge.js';
import Node from './Node.js';
import './index.css';

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '0',
      type: 'input',
      data: { label: 'Input Step' },
      position: { x: 250, y: 25 },
    },
    {
      id: '1',
      type: 'output',
      data: { label: 'Output Step' },
      position: { x: 250, y: 125 },
    }
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showEditModal, setShowEditModal] = useState(true);
  const [selectedNode, setSelectedNode] = useState({
    id: '0',
    type: 'input',
    data: { label: 'Input Step' },
    position: { x: 250, y: 25 },
  });
  const [id, setId] = useState('2');
  
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(
      {...connection, markerEnd: {type: MarkerType.ArrowClosed}, type: 'buttonedge', animated: true}, 
      eds)),
    [setEdges]
  );

  const handleClick = (type) => {
    setNodes((prev) => [...prev, {
      id: id,
      type: type,
      data: { label: 'Intermediate Step' },
      position: { x: 250 + parseInt(id)* 10, y: 25 + parseInt(id) * 10 },
    }]);
    setId((parseInt(id) + 1).toString());
  }

  const onNodesClick = (_e, node) => {
    console.log(node); 
    setSelectedNode(node);
    setShowEditModal(true); 
  }

  return (
    <Box>
      <Box>
        <Button onClick={() => handleClick('default')} variant="contained" color="primary" style={{marginRight: '20px'}}>Add step</Button>
      </Box>
      <Grid container spacing={2} >
        <Grid container item xs={9} style={{height: "90vh"}} direction="column" >
          <ReactFlow
            className="rftag"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeClick={onNodesClick}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={{ buttonedge: ButtonEdge }}
            fitView
          >
          <Controls />
          <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Grid>
        <Grid container item xs={3} direction="column" >
          {showEditModal && <Node selectedNode={selectedNode}/>}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Flow;
