import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoriesComponent} from '../app/features/news/components/stories/stories.component'

const routes: Routes = [

  { path: '', redirectTo: '/stories', pathMatch: 'full' },  
  { path: 'stories', component: StoriesComponent }          
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
