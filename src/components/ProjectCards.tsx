import React from 'react';

import ProjectCard from './ProjectCard';

import { Project } from '../types/types';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  }
}));

interface Props {
  projects: Project[],
  cardsAmount?: number
}

const ProjectCards: React.FC<Props> = (props) => {
  
  const { projects } = props;
  const classes = useStyles();

  let stuffProjects;
  if (projects) {
    stuffProjects = projects.filter((project) => project.stuffId === localStorage.getItem('id'));
  }

  return(
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          stuffProjects && stuffProjects.length
          ? 
          stuffProjects
            .slice(0, props.cardsAmount)
            .map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
              >
              </ProjectCard>
            )
          )
          : (
            <Typography className={classes.header} variant="h6" align="center" color="textPrimary" gutterBottom>
              No projects yet
            </Typography>
          )
        }
      </Grid>
    </Container>
  )
}


export default ProjectCards;