import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../product.model';
import { map } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  products : Products[] =[];
  productChanged = new Subject<Products[]>();

  constructor(private http: HttpClient) { }

  addProduct(product: Products){
    this.products.push(product);
    this.productChanged.next(this.products.slice());
    this.http.post('https://home-calculator.firebaseio.com/product.json',
    product)
    .subscribe(response=>{
      console.log(response);
    })
  }

  fetchProduct(){
    return this.http.get<Products[]>('https://home-calculator.firebaseio.com/product.json')
    .pipe(
      map(responseData=>{
        const productArray = [];
        for(const key in responseData){
          productArray.push({...responseData[key], id:key})
        }
        this.products = productArray;
        return productArray;
      })
    );
  }
}
