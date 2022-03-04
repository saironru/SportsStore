import { Order } from './order.model';
import { map, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Product } from './product.model';
import { Cart } from './cart.model';


const PROTOCOL = 'http'
const PORT = 3500


interface LoginResponse {
    success: boolean,
    token: string
}

interface LoginRequest {
    name: string,
    password: string
}

@Injectable()
export class RestDataSource {

    baseUrl: string
    auth_token: string | null = null


    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`
    }

    getProducts(): Observable<Product[]> {
        return this.sendRequest<Product[]>('GET', 'products')
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>('POST', 'products', product, true)
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest('PUT', `products/${product.id}`, product, true)
    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest('DELETE', `products/${id}`, null, true)
    }

    getOrders(): Observable<Order[]> {
        return this.sendRequest('GET', 'orders', null, true)
    }

    deleteOrder(id: number): Observable<Order> {
        return this.sendRequest('DELETE', `orders/${id}`, null, true)
    }

    updateOrder(order: Order): Observable<Order> {
        return this.sendRequest('PUT', `orders/${order.id}`, order, true)
    }

    saveOrder(order: Order): Observable<Order> {
        return this.sendRequest<Order>('POST', 'orders', order)
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.sendRequest<LoginResponse>('POST', 'login', {name: user, password: pass}).pipe(map(response => {
                 this.auth_token = response.success ? response.token : null
                 return response.success;
             }))
    }

    private sendRequest<T>(method: string, url: string, body?: Order | Product | LoginRequest | null, auth: boolean = false) {
        let options = {body: body, headers: {} };
        if (auth && this.auth_token !== null) {
            options.headers = {'Authorization': `Bearer<${this.auth_token}>`}
        }
        return this.http.request<T>(method, this.baseUrl + url, options)
    }
}