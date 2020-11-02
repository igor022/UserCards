export interface Stuff {
    _id: string, 
    name: string,
    email: string,
    password: string
}

export interface User {
    _id?: string,
    name: string,
    email: string,
    description: string,
    imageUrl: string,
    tags: string[],
    stuffId: string
}

export interface Project {
    _id?: string,
    name: string,
    status: string,
    price: string,
    devs: string[],
    description: string,
    stuffId: string,
}

export interface ProjectWithDevs {
    _id?: string,
    name: string,
    status: string,
    price: string,
    devs: User[],
    description: string,
    stuffId: string,
}

type FieldToEdit = {
    _id: string,
    [propName: string]: any
}

export type AddUser = (user: User) => void;
export type EditUser = (user: FieldToEdit) => void;
export type GetUsers = () => void;
export type DeleteUser = (id: string) => void;

export type AddProject = (project: Project) => void;
export type EditProject = (project: FieldToEdit) => void;
export type GetProjects = () => void;
export type DeleteProject = (id: string) => void;