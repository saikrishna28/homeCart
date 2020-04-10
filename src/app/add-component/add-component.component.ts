import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Products } from '../product.model';
import { AddService } from './add.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  products: Products[] =[];

  constructor(private addService: AddService) { }

  ngOnInit() {
  }

  onAdd(addForm: NgForm) {
    let prod = new Products();
    prod.quantity = addForm.value.quantity;
    prod.name = addForm.value.productName;
    prod.category = addForm.value.options;
    this.products.push(prod);
    this.addService.addProduct(prod);
  }

}