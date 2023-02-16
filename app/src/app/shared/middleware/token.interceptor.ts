import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private localStore: LocalStorageService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.localStore.getData('notes_access_token');

        if (jwt != null) {
            return next.handle(
                httpRequest.clone(
                    {
                        setHeaders: { x_access_token: jwt }
                    }
                )
            );
        }

        return next.handle(httpRequest);
    }

}