
export class AppError{

    constructor(public sourceError? : any){
        console.log(sourceError);
    }
}