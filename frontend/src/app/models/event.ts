import { Locations } from "./location";

export class Event {
    public _id!: string;
    public name!: string;
    public description!: string;
    public location!: Locations;
    public poster!: string;
    public price!: number;


    public file!: any;
}