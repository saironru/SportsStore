import { Cart } from './../model/cart.model';
import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Router } from '@angular/router';

@Component({ 
 selector: "store",  
 templateUrl: "store.component.html" 
}) 
export class StoreComponent { 

    public selectedCategory: string | null = null;
    public productsPerPage = 4;
    public selectedPage = 1;

    constructor(
        private repository: ProductRepository, 
        private cart: Cart,
        private router: Router) { }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedCategory)
        .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): (string | undefined)[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory: string | null = null) {
        this.selectedCategory = newCategory;
        this.selectedPage = 1;
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(el: EventTarget) {
        const newSize = (el as HTMLSelectElement).value
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    // get pageNumbers(): number[] {
    //     return Array(Math.ceil(this.repository
    //     .getProducts(this.selectedCategory).length / this.productsPerPage))
    //     .fill(0).map((x, i) => i + 1);
    // }

    get pageCount(): number {
        return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl('/cart')
    }
}