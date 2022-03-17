import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
 templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
    
    editing: boolean = false;
    product!: Product;

    constructor(
        private repository: ProductRepository,
        private router: Router,
        private activeRoute: ActivatedRoute) {

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            this.product = Object.assign({},
            repository.getProduct(activeRoute.snapshot.params["id"]));
        } else {
            this.product = new Product(0, '', '', '', 0)
        }
    }

    save(form: NgForm) {
        this.repository.saveProduct(this.product);
        this.router.navigateByUrl("/admin/main/products");
    }

}