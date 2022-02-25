import { Injectable } from "@angular/core";
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { StoreComponent } from "./store/store.component";

@Injectable()
export class StoreFirstGuard implements CanActivate {
    private firstNavigation = true;

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.firstNavigation) {
            this.firstNavigation = false;
            if (route.component != StoreComponent) {
                this.router.navigateByUrl('/');
                return false;
            }
        }
        return true;
    }


}