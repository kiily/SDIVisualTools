import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*This Service handles the connection to Firebase for the data relevant to discovery. It provides
methods to get all the links and link categories, to add a discovery link, to delete a link and
to update a link. */
@Injectable()
export class DiscoveryFirebaseService {

  constructor(private afdb: AngularFireDatabase) {

  }

  /*This method retrieves all the discovery links. It returns a FirebaseListObservable.*/
  getDiscoveryLinks() {

    let discoveryLinks = this.afdb.list("/discovery/links");
    return discoveryLinks;

  }

  /*This method retrieves all the discovery link categories. It returns a FirebaseListObservable.*/
  getDiscoveryLinkCategories() {
    let discoveryLinkCategories = this.afdb.list("/discovery/linkCategories");
    return discoveryLinkCategories;
  }

  /* This method takes a title, link and category and registers this new link object in the Firebase 
  database */
  addDiscoveryLink(title, link, category) {
    let discoveryLinks = this.afdb.list("/discovery/links");

    discoveryLinks.push({
      title: title,
      link: link,
      category: category
    });
  }

  /*This method takes a linkID and deletes it*/
  deleteLink(id){
    return this.afdb.object('/discovery/links/'+id).remove();
  }

   /* This method takes an id, title, link and category and updates the specified link object in the Firebase 
  database */
  updateLink(id, title, link, category){
    return this.afdb.object('/discovery/links/'+id).update({
      title: title,
      link: link,
      category: category
    });
  }
}
