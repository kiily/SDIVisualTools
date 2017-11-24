export class Attempt{
    constructor( public studentID : number, public problemID : number, public output : string,  public compile : string, 
     public date : string, public attemptID? : string,){

    }
}