import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

/* Utility pipe for making the PowerBI report URLs safe.

Reference:
 - https://stackoverflow.com/questions/43141534/angular2-base64-sanitizing-unsafe-url-value

 */

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {

  constructor(private sanitizer : DomSanitizer){

  
  }

  transform(url){
    // return this.sanitizer.bypassSecurityTrustUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
