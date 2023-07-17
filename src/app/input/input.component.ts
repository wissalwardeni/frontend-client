import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { PopupComponent } from '../component/popup/popup.component';
import { UserdetailComponent } from '../component/userdetail/userdetail.component';
import { PopupComponent1 } from '../component/popuReponse/popup.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  customerlist !: Customer[];
  dataSource: any;
  displayedColumns: string[] = ["type","titre", "Description", "message", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {
    this.loadcustomer();
  }


  Repondcustomer( code: any) {
    this.Openpopup( code, 'Reponce ',PopupComponent1);
  }
  
  
  deleteCustomer(id: string) {
    this.service.Archif(id).subscribe(
      response => {
        console.log('Delete operation successful');
        // Update the customer list after deletion
        this.loadcustomer();
        // Handle any other success logic here
      },
      error => {
        console.log('Delete operation failed');
        // Handle any error logic here
      }
    );
  }

  loadcustomer() {
    this.service.GetReponse().subscribe(res => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editcustomer(code: any) {
    this.Openpopup(code, 'Edit Customer',PopupComponent);
  }

  detailcustomer(code: any) {
    this.Openpopup(code, 'Réclamation Detail',UserdetailComponent);
  }

  

  addcustomer(){
    this.Openpopup(0, 'Ajouter réclamation',PopupComponent);
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadcustomer();
    })
  }

}
