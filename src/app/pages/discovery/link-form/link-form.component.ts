import { DiscoveryLinkCategory } from './../../../common/models/discovery/discovery-link.category.model';
import { Observable } from 'rxjs/Observable';
import { DiscoveryLink } from './../../../common/models/discovery/discovery-link.model';
import { DiscoveryFirebaseService } from './../../../services/discovery-services/discovery-firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent implements OnInit {

  addLinkForm: FormGroup;
  discoveryLinkCategories: Observable<DiscoveryLinkCategory[]>;
  

  constructor(private fb: FormBuilder, private discoveryFirebaseService: DiscoveryFirebaseService) {
    this.addLinkForm = fb.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      category: ['', Validators.required]
    });
  }



  ngOnInit() {
    this.discoveryLinkCategories = this.discoveryFirebaseService.getDiscoveryLinkCategories();
  }


  /* This method is linked to the "Add Link" button in the HTML template. It extracts the values from the 
addLinkForm and adds the link to the database */
addNewLink() {
  
      const title = this.addLinkForm.controls.title.value;
      const link = this.addLinkForm.controls.link.value;
      const category = this.addLinkForm.controls.category.value;
  
      const newLink = new DiscoveryLink(title, link, category);
      this.discoveryFirebaseService.addDiscoveryLink(newLink);
      this.addLinkForm.reset();
    }

}
