import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.loadingService.show();

    return next.handle(req).pipe(
      
      finalize(() => this.loadingService.hide()),
      catchError((error: HttpErrorResponse) => {
        
        this.loadingService.hide();
       
        return of(error as any);   
      })
    );
  }
}
