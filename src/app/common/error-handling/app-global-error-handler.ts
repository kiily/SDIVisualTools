
import { ErrorHandler } from '@angular/core';

/*References:
 - https://angular.io/api/core/ErrorHandler
 */

export class AppGlobalErrorHandler implements ErrorHandler{

    handleError(error){
        //the toast should be displayed from here
        //will use an alert for now
        //say that an unexpected error occurred
        console.log("Globally handled")
        
    }
}