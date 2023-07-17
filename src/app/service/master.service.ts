import { Injectable } from '@angular/core';
import { colorentity } from '../Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Country, Customer } from '../Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'black' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ]
  }

  GetCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://127.0.0.1:5000/admin/allreclamation");
  }
   GetCustomer0():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://127.0.0.1:5000/admin/deletedDocuments");
  }

  GetAutre():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://127.0.0.1:5000/type/autre");
  }
  GetReponse():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://127.0.0.1:5000/reponse/allreponse");
  }
  Archiff(id: string, data: any): Observable<any> {
    const url = `http://127.0.0.1:5000/reponse/reclamation/${id}`;
    return this.http.post(url, data);
  }

  DeleteCustomer(id: string): Observable<any> {
    const url = `http://127.0.0.1:5000/type/type/${id}`;
    return this.http.delete(url);
  }
  Change(id: string, updatedData: any): Observable<any> {
    const url = `http://127.0.0.1:5000/type/type/${id}`;
    return this.http.patch(url, updatedData);
  }

  Archif(id: string): Observable<any> {
    const url = `http://127.0.0.1:5000/admin/moveData/${id}`;
    return this.http.delete(url);
  }
  GetType():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://127.0.0.1:5000/type/type");
  }
  delete(id: string) {
    return this.http.delete(`http://127.0.0.1:5000/type/type/${id}`);
  }
  Savecustomer(data:any){
    console.log(data)
    return this.http.post("http://localhost:5000/type/type",data);
  }
  Savecustomer0(data:any){
    console.log(data)
    return this.http.post("http://localhost:5000/admin/reclamer",data);
  }

  GetCustomerbycode(id: string){
    return this.http.get(`http://127.0.0.1:5000/admin/reclamation/${id}`);
  }

  GetAssociate(){
    return this.http.get('http://localhost:5000/admin/allreclamation');
  }
  GetAssociatebycode(code:any){
    return this.http.get('http://localhost:5000/admin/allreclamation'+code);
  }
  GetCountry():Observable<Country[]>{
    return this.http.get<Country[]>('http://localhost:5000/admin/allreclamation');
  }

  SaveAssociate(data:any,code:any){
    return this.http.put('http://127.0.0.1:5000/admin/update'+code,data);
  }
  

}
