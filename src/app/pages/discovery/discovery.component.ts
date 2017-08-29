
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { Component, OnInit } from '@angular/core';
import { DiscoveryFirebaseService } from '../../services/discovery-services/discovery-firebase.service';
import { AlertGenerator } from '../../common/alerts/alert-generator';

/*This class acts as the controller for the Discovery component. It is associated with an HTML template
that renders the discovery page. Current features: add and remove discovery links from the database. */
@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  discoveryLinks: FirebaseListObservable<any[]>;
  discoveryLinkCategories: FirebaseListObservable<any[]>;
  category: Object;
  selectedOption : string;

  addLinkForm;

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
    this.authService.userScan();

    this.discoveryLinks = this.discoveryFirebaseService.getDiscoveryLinks();
    this.discoveryLinkCategories = this.discoveryFirebaseService.getDiscoveryLinkCategories();
  }

/* This method is linked to the "Add Link" button in the HTML template. It extracts the values from the 
addLinkForm and adds the link to the database */
  addNewLink() {

    let title = this.addLinkForm.controls.title.value;
    let link = this.addLinkForm.controls.link.value;
    let category = this.addLinkForm.controls.category.value;

    this.discoveryFirebaseService.addDiscoveryLink(title, link, category);
    this.addLinkForm.reset();
  }

/* This method is linked to the delete button next to each link in the addLinkForm. It is passed the linkID of
the discovery link to remove. A confirmation dialog is triggered and the link is deleted upon confirmation. */
  removeLink(linkID) {
    let dialogRef = this.alertGenerator.confirmDelete("Are you sure you want to delete this item?");
    
    dialogRef.subscribe( (response) => {
      this.selectedOption = response;
 
      //User confirms deletion
      if (this.selectedOption) {
        this.discoveryFirebaseService.deleteLink(linkID.$key)

        .then(() => {
          // could implement validation here
          console.log("then");
        })
        .catch(() => {
          // catch error here
          console.log("catch");
        });

      } 
     
    });
    
  }



}
