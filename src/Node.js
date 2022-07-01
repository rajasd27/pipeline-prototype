import { Card, CardContent, Typography, TextField, CardActions, Button, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'

function Node({ selectedNode }) {
  const [isEditable, setIsEditable] = useState(true);

  const handleEdit = () => {
    console.log("I am here");
    setIsEditable(!isEditable);
  };

  return (
    <Card variant="outlined" style={{background: '#ececec', marginRight: 'auto', width: '80%'}}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Step Attributes
        </Typography>
        <TextField
          id="standard-basic"
          label="Step Label"
          variant="filled"
          value={selectedNode.data.label}
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Step Type"
          variant="filled"
          value={""}
          fullWidth
          select
        >
          {["Service", "Model"].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-basic"
          label="Step Name"
          variant="filled"
          value={""}
          fullWidth
          select
        >
          {["Pipe Inspection Model", "YOLO Model"].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        {selectedNode.type === "input" && 
          <TextField
            id="standard-basic"
            label="Incoming Topic"
            variant="filled"
            type={'text'}
            value={""}
            fullWidth
          />
        }
        {selectedNode.type === "output" && 
          <TextField
            id="standard-basic"
            label="Outgoing Topic"
            variant="filled"
            type={'text'}
            value={""}
            fullWidth
          />
        }
      </CardContent>
      <CardActions>
        {selectedNode.type === "default" && 
          <Button variant='outlined' onClick={handleEdit}>
            Delete
          </Button>
        }
        <Button onClick={handleEdit}>
          Cancel
        </Button>
        <Button onClick={handleEdit}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}

export default Node