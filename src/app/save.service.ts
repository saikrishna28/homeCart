import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private http:HttpClient) { }

  editSave(products:Products[]){
    return this.http.put('https://home-calculator.firebaseio.com/product.json',products);
  }
}
