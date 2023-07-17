import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import {  Customer } from '../../Model/Customer';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  types: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private builder: FormBuilder,
    private service: MasterService
  ) {}

  ngOnInit(): void {
  this.inputdata = this.data;
  console.log('Input Data:', this.inputdata);

  if (this.inputdata.code > 0) {
    console.log('Code:', this.inputdata.code);
    this.setpopupdata(this.inputdata.code);
  }

  this.service.GetType().subscribe(types => {
    console.log('Received Types:', types);
    this.types = types.map((customer: Customer) => customer.type);
    console.log('Mapped Types:', this.types);
  });
}

  fileToUpload: any;

  upload(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  setpopupdata(code: any) {
    this.service.GetCustomerbycode(code).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({
        titre: this.editdata.titre,
        Description: this.editdata.Description,
        fileData: this.editdata.fileToUpload,
        type: this.editdata.type
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.builder.group({
    titre: this.builder.control(''),
    Description: this.builder.control(''),
    fileData: this.builder.control(''),
    type: this.builder.control('')
  });

  Saveuser() {
    this.service.Savecustomer0(this.myform.value).subscribe(res => {
      this.closepopup();
    });
  }
}
