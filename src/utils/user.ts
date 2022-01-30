/**
 * * User context and convenient functions
 */
import { createContext } from "react";
import { User } from '../types/index';

const UserCtx = createContext<User>(null);

export { UserCtx };