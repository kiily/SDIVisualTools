import { DiscoveryLink } from './../../common/models/discovery/discovery-link.model';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DiscoveryLinkCategory } from '../../common/models/discovery/discovery-link.category.model';

/*This Service handles the connection to Firebase for the data relevant to discovery. It provides
methods to get all the links and link categories, to add a discovery link, to delete a link and
to update a link. */
@Injectable()
export class DiscoveryFirebaseService {

  // retrieve the discovery links
  discoveryLinksRef: AngularFireList<DiscoveryLink>;
  // retrieve link categories
  linkCategoriesRef: AngularFireList<DiscoveryLinkCategory>;

  discoveryLinks$: Observable<DiscoveryLink[]>;
  linkCategories$: Observable<DiscoveryLinkCategory[]>;

  constructor(private afdb: AngularFireDatabase) {
    this.discoveryLinksRef = this.afdb.list('/discovery/links');
    this.linkCategoriesRef = this.afdb.list('/discovery/linkCategories');


    this.discoveryLinks$ = this.discoveryLinksRef.snapshotChanges()
    .map( discoveryLinks => {
      return discoveryLinks
      .map( c => {
        const key = c.payload.key;
        const link = c.payload.val();
        // add the key to enable link deletion
        const transformed = new DiscoveryLink(link['title'], link['link'], link['category'], key);
        return transformed;
      });
    });
    this.linkCategories$ = this.linkCategoriesRef.valueChanges();

  }

  /*This method retrieves all the discovery links. It returns a FirebaseListObservable.*/
  getDiscoveryLinks() {
    return this.discoveryLinks$;

  }

  /*This method retrieves all the discovery link categories. It returns a FirebaseListObservable.*/
  getDiscoveryLinkCategories() {
    return this.linkCategories$;
  }

  /* This method takes a title, link and category and registers this new link object in the Firebase
  database */
  addDiscoveryLink(newLink: DiscoveryLink) {
    this.discoveryLinksRef.push({
      title: newLink.title,
      link: newLink.link,
      category: newLink.category
    });
  }

  /*This method takes a linkID and deletes it*/
  deleteLink(linkToDelete: DiscoveryLink) {
    this.discoveryLinksRef.remove(linkToDelete.discoveryLinkID);
  }

   /* This method takes an id, title, link and category and updates the specified link object in the Firebase 
  database; CURRENTLY NOT IN USE */
  updateLink(id, title, link, category) {
    return this.afdb.object('/discovery/links/' + id).update({
      title: title,
      link: link,
      category: category
    });
  }
}
