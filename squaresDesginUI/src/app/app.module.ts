import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpModule } from '@angular/http';
import { CommonHttpService } from './common/app.httpservice';
import{GallerryService} from './gallery/gallery.service';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import {ProjectsService} from './projects/projects.service';
import { UploadService } from './upload/upload.service';

import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';

import { PortifolioComponent } from './portifolio/portifolio.component';
import {Datasharingservice} from './common/datasharingservice';
import { UploadnewComponent } from './uploadnew/uploadnew.component';

const routes: Routes = [  
  { path: '', component: HomeComponent },   
  { path: 'collection', component: GalleryComponent }, 
  { path: 'upload', component: UploadComponent }, 
  { path: 'projects', component: ProjectsComponent }, 
  {path: 'Portifolio', component: GalleryComponent },
  {path: '2326', component: PortifolioComponent },
  {path: '896776645673', component: UploadnewComponent }
   
];  


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    FooterComponent,
    UploadComponent,
    ProjectsComponent,
    
    PortifolioComponent,
    
    UploadnewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
  
    HttpModule,

  ],
  exports: [RouterModule] ,
  providers: [CommonHttpService,GallerryService,UploadService,ProjectsService,Datasharingservice],

  bootstrap: [AppComponent]

})
export class AppModule { }
