import * as React from 'react';
import { UserModel } from '../models/UserModel';

export type User = UserModel | null;

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextValue>(
  (null as any) as UserContextValue
);

export const UserProvider = (props: { children: React.ReactChild }) => {
  const [user, setUser] = React.useState<User>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
