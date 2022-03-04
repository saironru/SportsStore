import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { Cart } from './cart.model';
import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from './rest.datasource';
import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './auth.service';


@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository, {provide: StaticDataSource, useClass: RestDataSource}, Cart,
                Order, OrderRepository, AuthService, RestDataSource
                ]
})
export class ModelModule { }