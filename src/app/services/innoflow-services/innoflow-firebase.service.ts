import { InnovationUser } from './../../common/models/innovation/innovation-user.model';
import { Observable } from 'rxjs/Observable';
import { Innovation } from './../../common/models/innovation/innovation.model';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*This Service handles the connection to Firebase for the data relevant to innovation. It provides
methods to add new users to the innovations node as well as for adding the relevant innovations
to these users. It also provides methods to retrieve all the stored users and their innovations */
@Injectable()
export class InnoflowFirebaseService {


  innovationUsersRef: AngularFireList<InnovationUser>;
  innovationsRef: AngularFireList<Innovation>;

  innovationUsers$: Observable<InnovationUser[]>;
  innovations$: Observable<Innovation[]>;

  constructor(private afdb: AngularFireDatabase) { 
    this.innovationUsersRef = this.afdb.list("/innovation");
  

    this.innovationUsers$ = this.innovationUsersRef.snapshotChanges()
    .map(innovationUsers => {
      return innovationUsers.map ( c=> {
        let key = c.payload.key;
        let data = c.payload.val();
    
        let transformed = new InnovationUser(data['username'], data['innovations'], key);
        
        return transformed;
        
      });
    });
  }

    /*This method retrieves all the users in the innovations node */
    getUsers(){
      return this.innovationUsers$;
    }
  
    /*This method retrieves all the innovations for the specified userID from the 
    Firebase database. */
    getUserInnovations(user : InnovationUser){
      this.innovationsRef = this.afdb.list('/innovation/'+user.userID+'/innovations');
      this.innovations$ = this.innovationsRef.snapshotChanges()
      .map(innovations => {
        return innovations.map ( c=> {
  
          let data = c.payload.val();
      
          let transformed = new Innovation(data['code'], data['created']);
          
          return transformed;
          
        });
      });;
     return this.innovations$;
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



}
