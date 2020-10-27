import { GET_PROJECTS_LOADING, GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from './actionTypes';
import api from '../api/projectApi';

export const addProject = (project) => async (dispatch) => {
  try {
    console.log(project);
    const newProject = await api.addProject(project);

    dispatch({
      type: ADD_PROJECT,
      payload: {
        project: newProject
      }
    });

  } catch (err) {
    throw(err);
  }
}

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECTS_LOADING,
    })
    const projects = await api.getProjects();
 
    dispatch({
      type: GET_PROJECTS,
      payload: {
        projects
      }
    });
  } catch (err) {
    throw(err);
  }
}

export const editProject = (project) => async(dispatch) => {
  try {
    const editedProject = await api.editProject(project);
    console.log('ed', editedProject);
    dispatch({
      type: EDIT_PROJECT,
      payload: {
        project: editedProject
      }
    });
  } catch(err) {
    throw(err);
  }
}

export const deleteProject = (id) => async (dispatch) => {
  try {
    const project = await api.deleteProject(id);
    dispatch({
      type: DELETE_PROJECT,
      payload: {
        id: project._id
      }
    });
  } catch(err) {
    throw(err);
  }
}