import { Component, OnInit, ViewChild } from '@angular/core';
import { AddService } from '../add-component/add.service';
import { Products } from '../product.model';
import { EventEmitter } from 'protractor';
import { NgForm } from '@angular/forms';
import { SaveService } from '../save.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  @ViewChild('editForm', {static:false}) ef : NgForm;

products: Products[] = [];
filteredProducts: Products[] = [];
editFlag = false;
id: string;
searchIndex:number;
filter = 'All';

  constructor(private addServ: AddService, private saveServ:SaveService) { }

  ngOnInit() {
    this.addServ.fetchProduct()
    .subscribe((result:Products[])=>{
      this.products = result;
      this.filteredProducts = result;
      console.log(result);
    });

    this.addServ.productChanged.subscribe(products=>{
      this.products = products;
    });
  }

  onEdit(p:Products,i:string,index:number){
    this.editFlag = true;
    this.id=i;
    this.searchIndex=index;
      this.ef.setValue(
        {
          category: p.category,
          name: p.name,
          quantity: p.quantity
        }
      );
  }

  onClose(){
    this.editFlag = false;
  }

  saveEdit(editForm:NgForm){
    let temp = editForm.value;
    this.products.forEach((value,key)=>{
      if(value.id==this.id){
        temp.id = this.id;
        this.products[key]=temp;
      }
    })
    this.filteredProducts[this.searchIndex] = temp;
    console.log(this.products);
  }

  onDelete(i:number){
    this.editFlag = false;
    this.products.splice(i,1);
    console.log(this.products);
  }

  doSave(){
    this.saveServ.editSave(this.products)
    .subscribe(response=>{
    console.log(response);
      // this.products=response;
    });
    console.log(this.products);
  }

  filterRecords(){
    this.editFlag = false;
    if(this.filter == 'All'){
      this.filteredProducts = this.products;
    }else{
      this.filteredProducts = this.products.filter(response=>response.category==this.filter?true:false);
    }
  }

}
