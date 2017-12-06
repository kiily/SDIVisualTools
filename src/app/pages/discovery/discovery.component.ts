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

  pageTitle = "Discovery";
  discoveryLinks : DiscoveryLink[] =[] ;
  discoveryLinkCategories : DiscoveryLinkCategory[] = [];
  

  selectedOption : string;

  addLinkForm : FormGroup;

  constructor(private discoveryFirebaseService: DiscoveryFirebaseService, private formBuilder: FormBuilder,
    private alertGenerator: AlertGenerator, private authService : AuthService) {

    this.addLinkForm = formBuilder.group({
      title: ["", Validators.required],
      link: ["", Validators.required],
      category: ["", Validators.required]
    });
  }

  /*Use the Angular lifecycle hooks to retrieve the discovery data */
  ngOnInit() {
    //Checking that a user is logged in
    this.authService.userScan();

    this.discoveryFirebaseService.getDiscoveryLinks().subscribe( discoveryLinks => {
      this.discoveryLinks = discoveryLinks;
    });
    this.discoveryFirebaseService.getDiscoveryLinkCategories().subscribe( linkCategories => {
      this.discoveryLinkCategories = linkCategories;
    });
  }

/* This method is linked to the "Add Link" button in the HTML template. It extracts the values from the 
addLinkForm and adds the link to the database */
  addNewLink() {

    let title = this.addLinkForm.controls.title.value;
    let link = this.addLinkForm.controls.link.value;
    let category = this.addLinkForm.controls.category.value;

    let newLink = new DiscoveryLink(title, link, category);
    this.discoveryFirebaseService.addDiscoveryLink(newLink);
    this.addLinkForm.reset();
  }

/* This method is linked to the delete button next to each link in the addLinkForm. It is passed the linkID of
the discovery link to remove. A confirmation dialog is triggered and the link is deleted upon confirmation. */
  removeLink(linkToDelete : DiscoveryLink) {
    let dialogRef = this.alertGenerator.confirmDelete("Are you sure you want to delete this item?");
    
    dialogRef.subscribe( (response) => {
      this.selectedOption = response;
 
      //User confirms deletion
      if (this.selectedOption) {
        this.discoveryFirebaseService.deleteLink(linkToDelete);

      } 
     
    });
    
  }



}
