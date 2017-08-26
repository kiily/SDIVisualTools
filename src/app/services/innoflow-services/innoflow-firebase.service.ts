import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class InnoflowFirebaseService {

  constructor(private afdb : AngularFireDatabase) { }

  addInnovationUser(userID){
    let innovationUser = this.afdb.object("/innovation");

    innovationUser.set(userID);

  }


  addInnovation(innovation, userID){
    let innovations = this.afdb.list("innovation/"+userID+"/innovations");

    innovations.push(innovation);
  }
}
