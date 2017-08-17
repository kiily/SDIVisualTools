import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class DiscoveryService {

  constructor(private afdb: AngularFireDatabase) {

  }

  getDiscoveryLinks() {

    let discoveryLinks = this.afdb.list("/discovery/links");
    return discoveryLinks;

  }

  getDiscoveryLinkCategories() {
    let discoveryLinkCategories = this.afdb.list("/discovery/linkCategories");
    return discoveryLinkCategories;
  }

  addDiscoveryLink(title, link, category) {
    let discoveryLinks = this.afdb.list("/discovery/links");

    discoveryLinks.push({
      title: title,
      link: link,
      category: category
    });
  }

  deleteLink(id){
    return this.afdb.object('/discovery/links/'+id).remove();
  }

  updateLink(id, title, link, category){
    return this.afdb.object('/discovery/links/'+id).update({
      title: title,
      link: link,
      category: category
    });
  }
}
