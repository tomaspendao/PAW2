import { Ticket } from "./ticket";


export class User {
  public _id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  //public tickets!: Ticket[];
  public role!: string;
}
