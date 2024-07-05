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
} & (
    | {
          role: "doctor";
          meta: {
              mp: string;
              dni: string;
          };
      }
    | { role: "secretary"; meta: { dni: string } }
);

export type Token = string;
