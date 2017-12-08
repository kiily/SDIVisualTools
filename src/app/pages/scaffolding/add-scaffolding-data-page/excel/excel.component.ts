import { Student } from './../../../../common/models/scaffolding/student.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as XLSX from 'xlsx';
import { AlertGenerator } from '../../../../components/alerts/alert-generator';
import { ISubscription } from 'rxjs/Subscription';
import { SEATFirebaseService } from '../../../../services/seat-services/seat-firebase.service';



// declate array of array type
type AOA = Array<Array<any>>;

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit, OnDestroy {

  excelData: AOA;

  studentsSub: ISubscription;
  students: Student[] = [];


  constructor(private alertGenerator: AlertGenerator, private seatFirebaseService: SEATFirebaseService,
  ) { }

  ngOnInit() {
    this.studentsSub = this.seatFirebaseService.getStudents().subscribe( students => {
      this.students = students;
    });
  }

  ngOnDestroy(){
    this.studentsSub.unsubscribe();
  }

   /*Utility method that opens a file picker and reads an Excel file passed to it.
  Current setup only uploads one sheet at the time */
  onFileChanged(event: any) {

        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
          throw new Error('Only a single file can be opened at any given time');
        }

        const reader = new FileReader();
        // Set the event for when the reader loads
        reader.onload = (evt: any) => {
          /* READ WORKBOOK */
          const binaryFile = evt.target.result;
          const workbook = XLSX.read(binaryFile, {type: 'binary'});

          const worksheets = [];
          // Will only grab the first sheet for now - could have a for loop here
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];

          /*SAVE DATA AS JSON */
          this.excelData = <AOA>(XLSX.utils.sheet_to_json(worksheet, {header: 1}));

          console.log(this.excelData);

        };
        // Read the selected file
        reader.readAsBinaryString(target.files[0]);


      }

  // this should be delegated to the Firebase Service and should reset the variable to null so that the table is hidden
  // once uploaded; TO BE FINISHED (Only allows attempts and students to be uploaded)
  uploadExcelData() {

        if (this.excelData == null) {
          this.alertGenerator.generateDataAdditionError('Please select a file to upload');
        }else {

          // Check the header and see if it matches the expected format for uploading student data
          // StudentID, FirstName, LastName, Email, PromotionYear
          // extract the headers
          const headers = this.excelData[0];

          if (headers.includes('StudentID') && headers.includes('FirstName')
            && headers.includes('LastName') && headers.includes('Email')
          && headers.includes('PromotionYear')) {
            // headers are valid - assume that the data is too


              // clear the excel data after the upload
              // this.excelData = null;
              console.log('pressed');

          for (let i = 1; i < this.excelData.length; i++) {
            const studentRow = (this.excelData[i]);

            const studentID = studentRow[0];

            // extract student IDs
            const studentIDs: number[] = [];
            for (const student of this.students){
              studentIDs.push(student.studentID);
            }

            if (!studentIDs.includes(studentID)) {
            const firstName = studentRow[1];
            const lastName = studentRow[2];
            const email = studentRow[3];
            const promotionYear = studentRow[4];

            const student = new Student(studentID, email, firstName, lastName,  promotionYear);
            this.seatFirebaseService.addStudent(student);
            }else {
              this.alertGenerator.generateDataAdditionError('Please ensure that all student IDs are unique.');
              break;
            }
          }

        }else {
          // headers are not valid
          this.alertGenerator.generateDataAdditionError('Please ensure that the data format is correct');
        }
        }

      }
}
