import { DiscoveryFirebaseService } from '../services/discovery-services/discovery-firebase.service';
import { AlertGenerator } from '../common/alerts/alert-generator';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { Component, OnInit } from '@angular/core';

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

  constructor(private discoveryService: DiscoveryFirebaseService, private formBuilder: FormBuilder,
    private alertGenerator: AlertGenerator) {

    this.addLinkForm = formBuilder.group({
      title: ["", Validators.required],
      link: ["", Validators.required],
      category: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.discoveryLinks = this.discoveryService.getDiscoveryLinks();
    this.discoveryLinkCategories = this.discoveryService.getDiscoveryLinkCategories();
  }

  addNewLink() {

    let title = this.addLinkForm.controls.title.value;
    let link = this.addLinkForm.controls.link.value;
    console.log("error is right below");
    let category = this.addLinkForm.controls.category.value;

    console.log("category is:" + category);


    this.discoveryService.addDiscoveryLink(title, link, category);
    console.log("added");
    this.addLinkForm.reset();
  }

  removeLink(linkID) {
    console.log(linkID);
    let dialogRef = this.alertGenerator.confirmDelete("Are you sure you want to delete this item?");
    
    console.log("fails below");
    dialogRef.subscribe( (response) => {
      this.selectedOption = response;

      console.log("enters here"+this.selectedOption);
    
      if (this.selectedOption) {
        console.log("deleting item");

        this.discoveryService.deleteLink(linkID.$key)
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
