import axios from 'axios';

import { Project, FieldToEdit } from '../types/types';

const api = process.env.REACT_APP_API;

const addProject = async (project: Project) => {
  try {
    const { data } = await axios.post(
      `${api}/projects`, 
      { 
        project,
        jwt: localStorage.getItem('jwt'),
      },
    );

    return data;

  } catch (err) {
    throw(err);
  }

}

const deleteProject = async (id: string) => {
  try {
    const { data } = await axios (
      {
        method: 'delete',
        url: `${api}/projects/`,
        data: {
          id,
          jwt: localStorage.getItem('jwt'),
        }
      }
    );
    return data;
  } catch(err) {
    throw(err);
  }
}

const editProject = async (project: FieldToEdit) => {
  try {
    const { data } = await axios (
      {
        method: 'patch',
        url: `${api}/projects/`,
        data: {
          project,
          jwt: localStorage.getItem('jwt'),
        }
      }
    );
    return data;
  } catch(err) {
    throw(err);
  }
}

const getProjects = async () => {
  try {
    const { data } = await axios.get(`${api}/projects/`);

    return data; 
  } catch(err) {
    throw(err);
  }
}


export default {
  addProject,
  deleteProject,
  getProjects,
  editProject,
}