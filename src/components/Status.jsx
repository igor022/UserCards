import React from 'react';

import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';


const chooseColor = (name) => {
  switch (name.toLowerCase()) {
    case 'active':
      return '#ff9800';
    case 'pending':
      return '#2196f3';
    case 'done':
      return '#4caf50';
    case 'closed':
      return '#f44336';
    default:
      return '#a0a0a0';
  }
}

const Status = (props) => {
  const color = chooseColor(props.name);
  return (
    <Chip
      style={{ color: 'white', backgroundColor: color }}
      label={props.name}
    />
  )
}

export default Status;