import { Project, User, UserWithProjects, ProjectWithDevs } from '../types/types';


export const getStuffProjects = (projects: Project[], id: string | null): Project[] => {
if (projects && id) {
  return projects.filter((p) => p.stuffId === id);
}
return [];
}

export const getStuffUsers = (users: User[], id: string | null): User[] => {
if (users && id) {
  return users.filter((user) => user.stuffId === id);
}
return [];
}

export const getProjectsWithDevs = (projects : Project[], users: User[], id: string | null): ProjectWithDevs[] => {
  if (projects && users && id) {
    const stuff: User[] = getStuffUsers(users, id);

    const withDevs: ProjectWithDevs[] = projects
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

export const getDevsWithProjects = (projects: Project[], users: User[]): UserWithProjects[] => {
  if (projects && users) {
    return users.map((u) => {
      const devProjects = projects.filter((p) => {
        return p.devs.find((dev) => dev === u._id);
      })
      return {
        ...u,
        devProjects
      };
    })
  }
  return [];
}