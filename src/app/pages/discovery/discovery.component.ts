import { Observable } from 'rxjs/Observable';
import { DiscoveryLink } from './../../common/models/discovery/discovery-link.model';
import { DiscoveryLinkCategory } from './../../common/models/discovery/discovery-link.category.model';

import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DiscoveryFirebaseService } from '../../services/discovery-services/discovery-firebase.service';
import { AlertGenerator } from '../../components/alerts/alert-generator';
import { FormGroup } from '@angular/forms/src/model';

/*This class acts as the controller for the Discovery component. It is associated with an HTML template
that renders the discovery page. Current features: add and remove discovery links from the database. */
@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  pageTitle = 'Discovery';
  discoveryLinks: Observable<DiscoveryLink[]>;


  selectedOption: string;



  constructor(private discoveryFirebaseService: DiscoveryFirebaseService, private formBuilder: FormBuilder,
    private alertGenerator: AlertGenerator, private authService: AuthService) {


  }

  /*Use the Angular lifecycle hooks to retrieve the discovery data */
  ngOnInit() {
    // Checking that a user is logged in
    this.authService.userScan();

    this.discoveryLinks = this.discoveryFirebaseService.getDiscoveryLinks();
  }



/* This method is linked to the delete button next to each link in the addLinkForm. It is passed the linkID of
the discovery link to remove. A confirmation dialog is triggered and the link is deleted upon confirmation. */
  removeLink(linkToDelete: DiscoveryLink) {
    const dialogRef = this.alertGenerator.confirmDelete('Are you sure you want to delete this item?');

    dialogRef.subscribe( (response) => {
      this.selectedOption = response;

      // User confirms deletion
      if (this.selectedOption) {
        this.discoveryFirebaseService.deleteLink(linkToDelete);

      }

    });

  }



}
