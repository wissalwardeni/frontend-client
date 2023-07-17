import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { PopupComponent } from '../popup/popup.component';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { PopuptypeComponent } from '../../popuptype/popuptype.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
 
  customerlist !: Customer[];
  dataSource: any;
  displayedColumns: string[] = ["type", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {
    this.loadcustomer();
  }

  deleteCustomer(id: string) {
    this.service.DeleteCustomer(id).subscribe(
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
    this.service.GetType().subscribe(res => {
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
    this.Openpopup(code, 'Customer Detail',UserdetailComponent);
  }

  

  addcustomer(){
    this.Openpopup(0, 'Ajouter type',PopuptypeComponent);
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