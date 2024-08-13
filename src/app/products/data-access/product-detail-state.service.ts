import { inject, Injectable } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { map, Observable, switchMap } from "rxjs";
import { ProductService } from "./products.service";
import {signalSlice} from 'ngxtension/signal-slice'

interface State{
    product : Product | null;
    status:'loading' |'sucess'|'error';
}

@Injectable()
export class ProductDetailStateService{
    private productService = inject(ProductService);

    private initialState: State = {
        product:null,
        status:'loading' as const,
      };

    state = signalSlice ({
        initialState: this.initialState,
        actionSources : {
                getById: (_state, $: Observable<string>) => $.pipe(
                    switchMap((id) => this.productService.getProduct(id)),
                    map((data) => ({ product: data, status : 'sucess' as const })),
                    ),
        },
    });
}