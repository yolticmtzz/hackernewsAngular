import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoriesComponent } from './features/news/components/stories/stories.component'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from "./core/services/loading.service";
import { LoadingInterceptor } from "./core/interceptor/loading.interceptor";
import { ApiKeyInterceptor } from "./core/interceptor/api-key.interceptor";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
