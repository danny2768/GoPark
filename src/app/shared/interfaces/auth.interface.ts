import { Token } from "./token.interface";
import { User } from "./user.interface";

export interface Auth {
  accessToken: Token;
  user:        User;
}
