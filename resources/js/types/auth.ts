export type AuthenticatedUser = {
    token: string;
} & User;

export type User = {
    id: number;
    avatar: string;
    username: string;
    names: string;
    lastName: string;
    fullName: string;
    joinedOn: string;
    roles: Role[];
};

type Role =
    | {
          name: string;
          mp: string;
          dni: string;
      }
    | {
          name: string;
          dni: string;
      };

export type Token = string;
