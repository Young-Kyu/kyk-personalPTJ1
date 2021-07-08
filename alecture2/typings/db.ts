export interface IUser {
    id : number;
    nickname : string;
    email : string;
    Workspaces : IWorkspace[];
}

export interface IWorkspace{
    id : number;
    name : string;
    url : string;
    ownerId : number;
}