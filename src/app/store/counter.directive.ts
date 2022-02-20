import { Directive, ViewContainerRef, TemplateRef, Input } from "@angular/core"; 

    class CounterDirectiveContext { 
        constructor(public $implicit: any) { } 
    } 


   @Directive({ 
    selector: "[counterOf]" 
   }) 
   export class CounterDirective { 

    @Input("counterOf") counter!: number;

    constructor(
        private container: ViewContainerRef, 
        private template: TemplateRef<Object>) { }

     
    ngOnChanges() { 
        this.container.clear(); 
        for (let i = 0; i < this.counter; i++) { 
        this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1)); 
        } 
    }
     
   } 
