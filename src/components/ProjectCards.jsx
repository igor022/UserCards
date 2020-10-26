import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProjectCard from './ProjectCard';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));


const ProjectCards = (props) => {
  
  const { projects } = props;
  const classes = useStyles();

  return(
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          projects && projects.length
          ? 
          projects
            .slice(0, props.cardsAmount)
            .map((project, i) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
              >
              </ProjectCard>
            )
          )
          : (
            <p>No projects</p>
          )
        }
      </Grid>
    </Container>
  )
}


export default ProjectCards;