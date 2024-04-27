export type AuthenticatedUser = {
    token: string;
    user: User;
};

export type User = {
    id: number;
    username: string;
    name: string;
    created_at: Date;
    updated_at: Date;
};

export type TokenAtom = string | null;
