import { GET_PROJECTS_LOADING, GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from '../actions/actionTypes';

import { Project } from '../types/types';

interface ProjectsState {
  projects: Project[],
  isLoading: boolean
}

const initState: ProjectsState = {
  projects: [],
  isLoading: false,
}

const projectReducer = (state: ProjectsState = initState, {type, payload}) => {
  switch (type) {
    case GET_PROJECTS_LOADING:
      {
        return {
          ...state,
          isLoading: true
        }
      }
      break;

    case GET_PROJECTS:
      {
        const projects: Project[] = payload.projects;
        return {
          ...state,
          projects,
          isLoading: false
        }
      }
      break;

    case ADD_PROJECT: 
      {
        const project: Project = payload.project;
        const projects: Project[] = [...state.projects];
        projects.unshift(project);
        return {
          ...state,
          projects
        }
      }
      break;

    case EDIT_PROJECT:
      {
        const project: Project = payload.project;
        const projects: Project[] = [...state.projects];
        const projectToEdit = projects.findIndex((p) => p._id === project._id);
        projects.splice(projectToEdit, 1, project);
        return {
          ...state,
          projects
        }
      }
      break;

    case DELETE_PROJECT: 
      {
        const id: string = payload.id;
        const projects = state.projects.filter((p) => p._id !== id);
        return {
          ...state,
          projects
        }
      }
      break;
    
    default:
      break;
  }


  return state;
}

export default projectReducer;