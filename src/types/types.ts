export interface Stuff {
    _id: string, 
    name: string,
    email: string,
    password: string
}

export interface User {
    _id: string,
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