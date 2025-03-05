import type { MetaPagination } from "../meta-pagination.interface";

export interface Users {
    data: User[];
    meta: MetaPagination;
}

export interface User {
    id:          string;
    name:        string;
    email:       string;
    phoneNumber: string;
    roleId:      string;
    createdAt:   Date;
    role:        Role;
}

export interface Role {
    id:   string;
    name: Name;
}

export enum Name {
    Cleaner = "Cleaner",
    Manager = "Manager",
    SuperAdmin = "super_admin",
}

