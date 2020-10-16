import { GET_PROJECTS_LOADING, GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from '../actions/actionTypes';


const initState = {
  projects: [],
  isLoading: false,
}

const projectReducer = (state = initState, {type, payload}) => {
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
        const { projects } = payload;
        return {
          ...state,
          projects,
          isLoading: false
        }
      }
      break;

    case ADD_PROJECT: 
      {
        const { project } = payload;
        const projects = [...state.projects];
        projects.unshift(project);
        return {
          ...state,
          projects
        }
      }
      break;

    case EDIT_PROJECT:
      {
        const { project } = payload;
        const projects = [...state.projects];
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
        const { id } = payload;
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