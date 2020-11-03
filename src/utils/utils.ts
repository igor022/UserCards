import { Project, User, ProjectWithDevs } from '../types/types';


export const getProjectsWithDevs = (projects : Project[], users: User[], id: string): ProjectWithDevs[] => {
  if (projects && users && id) {
    const stuff = users.filter((user) => user.stuffId === id);

    const withDevs = projects
    .filter((p) => p.stuffId === id)
    .map((project) => {
        const developers: User[] = project.devs.map((dev) => stuff.find((u) => u._id === dev))
        .filter((item) => item !== undefined) as User[];
        
        return {
          ...project,
          devs: developers
        } 
      }
      );
      return withDevs;
    }
    return [];
  }
  
export const getStuffProjects = (projects: Project[], id: string): Project[] => {
  if (projects && id) {
    return projects.filter((p) => p.stuffId === id);
  }
  return [];
}

export const getStuffUsers = (users: User[], id: string): User[] => {
  if (users && id) {
    return users.filter((user) => user.stuffId === id);
  }
  return [];
}
