export type AuthenticatedUser = {
    token: string;
} & User;

export type User = {
    id: number;
    avatar: string;
    username: string;
    name: string;
    created_at: Date;
    updated_at: Date;
};

export type Token = string;
