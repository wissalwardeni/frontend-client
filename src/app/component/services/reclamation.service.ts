import { HttpClient } from "@angular/common/http";
import { Reclamation } from "../dto/reclamation";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class reclamationService {
  
    constructor(private http: HttpClient) { }
  
    
    getAll() {
      return this.http.get<Reclamation[]>('http://localhost:5000/admin/allreclamation');
    }
  
    addNew(data:any){
      return this.http.post('http://127.0.0.1:5000/admin/reclamer',data);
    }

    delete(id:string){
        return this.http.delete('http://127.0.0.1:5000/admin/supprimer/${id}')
    }
  }