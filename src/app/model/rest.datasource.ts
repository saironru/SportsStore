import { Order } from './order.model';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import { Product } from './product.model';

const URL = 'http://localhost:3500'

@Injectable()
export class RestDataSource {


    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product> {
        return this.http.get<Product>(URL + '/products')
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(URL + '/orders', order)
    }
}