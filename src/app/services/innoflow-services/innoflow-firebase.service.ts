import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class InnoflowFirebaseService {

  constructor(private afdb : AngularFireDatabase) { 

  }

  addInnovationUser(user){
    let userID = user.id;
    let username = user.username;
    console.log(username);

    let innovationUser = this.afdb.object("/innovation/"+user.id);
    innovationUser.set({
      username: username
    });
    }

  addInnovation(innovation, userID){
    let innovations = this.afdb.list("innovation/"+userID+"/innovations");
    innovations.push(innovation);
  }

  getUsers(){
    let innovationUsers = this.afdb.list("/innovation");
    return innovationUsers;
  }

  getUserInnovations(userID){
    let userInnovations =  this.afdb.list("/innovation/"+userID+"/innovations");
    return userInnovations;
  }



}
