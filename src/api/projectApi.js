import axios from 'axios';

const addProject = async (project) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/projects', 
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

const deleteProject = async (id) => {
  try {
    const { data } = await axios (
      {
        method: 'delete',
        url: 'http://localhost:8080/projects/',
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

const editProject = async (project) => {
  try {
    const { data } = await axios (
      {
        method: 'patch',
        url: 'http://localhost:8080/projects/',
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
    const { data } = await axios.get('http://localhost:8080/projects/');
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