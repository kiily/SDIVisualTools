import { forEach } from '@angular/router/src/utils/collection';
import { Workbook } from './../../../wijmo-commonjs-min/wijmo.xlsx.d';
import { FlexGridXlsxConverter } from '../../../wijmo-commonjs-min/wijmo.grid.xlsx';
import { WjFlexGrid } from '../../../wijmo-commonjs-min/wijmo.angular2.grid';
import { ViewChild, ElementRef } from '@angular/core';
import { SEATService } from '../services/seat.service';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-scaffolding',
  templateUrl: './scaffolding.component.html',
  styleUrls: ['./scaffolding.component.css']
})
export class ScaffoldingComponent implements OnInit {
  phaseNumber: number;
  appLink: string;
  appDashboardLink: string;

  data: any[] = [];
  @ViewChild('flex') flex: WjFlexGrid;
  @ViewChild('excelfile') element: ElementRef;


  constructor(private seatService: SEATService) {

  }

  ngOnInit() {

    this.data.push({
      attemptID: 1,
      studentID: 1,
      compile: "Y",
      output: "Wrong",
      date: "18/08/2017"
    });


    this.seatService.getAppLink().subscribe(appLink => {

      this.appLink = appLink.link;
      this.appDashboardLink = appLink.dashboardLink;
      console.log(this.appDashboardLink);
      console.log(this.appLink);
    });
  }

  togglePhase(phaseNumber: number) {
    this.phaseNumber = phaseNumber;
    console.log(this.phaseNumber);
    console.log(phaseNumber);
  }


  importExcel() {

    let flex = this.flex;
    let fileInput = this.element.nativeElement;
    console.log(fileInput);
    // if (fileInput.files[0]){
    //   FlexGridXlsxConverter.load(this.flex, fileInput.files[0], { includeColumnHeaders: true});
    // }

  }

  fileEvent(fileInput: any) {
    let file = fileInput.target.files[0];
    console.log(file);

    let wb: Workbook = file;
    

    FlexGridXlsxConverter.load(this.flex, wb, { sheetName: 'AttemptsNew' , includeColumnHeaders: true});
    
  }

}



