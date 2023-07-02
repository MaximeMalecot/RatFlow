export interface AppInList {
    _id: string;
    name: string;
    users: string[];
    origins: string[];
}

export interface AppInterface {
    _id: string;
    name: string;
    users: string[];
    origins: string[];
    appSecret: string;
    owner: string;
}
