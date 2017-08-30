import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*This Service handles the connection to Firebase for the data relevant to innovation. It provides
methods to add new users to the innovations node as well as for adding the relevant innovations
to these users. It also provides methods to retrieve all the stored users and their innovations */
@Injectable()
export class InnoflowFirebaseService {

  constructor(private afdb : AngularFireDatabase) { 

  }

  /*This method registers a new user in the innovations node of the Firebase database */
  addInnovationUser(user){
    let userID = user.id;
    let username = user.username;

    let innovationUser = this.afdb.object("/innovation/"+user.id);
    innovationUser.set({
      username: username
    });
    }

    /*This method adds an innovation to the specified userID */
  addInnovation(innovation, userID){
    let innovations = this.afdb.list("innovation/"+userID+"/innovations");
    innovations.push(innovation);
  }

  /*This method retrieves all the users in the innovations node */
  getUsers(){
    let innovationUsers = this.afdb.list("/innovation");
    return innovationUsers;
  }

  /*This method retrieves all the innovations for the specified userID from the 
  Firebase database. */
  getUserInnovations(userID){
    let userInnovations =  this.afdb.list("/innovation/"+userID+"/innovations");
    return userInnovations;
  }

}
