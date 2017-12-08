import { Innovation } from './innovation.model';

export class InnovationUser {
    constructor(public username : string, public innovations? : Innovation[], public userID? : string){

    }
}