import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { DiscoveryService } from './../services/discovery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  discoveryLinks : FirebaseListObservable<any[]>;
  discoveryLinkCategories : FirebaseListObservable<any[]>;
  category : Object;

  addLinkForm;

  constructor(private discoveryService: DiscoveryService, private formBuilder : FormBuilder) { 

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

  addNewLink(){
    
    let title = this.addLinkForm.controls.title.value;
    let link = this.addLinkForm.controls.link.value;
    console.log("error is right below");
    let category = this.addLinkForm.controls.category.value;

    console.log("category is:"+category);
    

    this.discoveryService.addDiscoveryLink(title, link, category);
    console.log("added");
  }

}
