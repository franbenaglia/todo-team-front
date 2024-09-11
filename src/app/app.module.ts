import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ContainerCarouselComponent } from './container-carousel/container-carousel.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ContainerComponent } from './container/container.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

//import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { CarouselMinComponent } from './carousel-min/carousel-min.component';
import { SplitterModule } from 'primeng/splitter';
import { ListboxModule } from 'primeng/listbox';
import { DragDropModule } from 'primeng/dragdrop';
import { CardMinComponent } from './card-min/card-min.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
import { CardModule } from 'primeng/card';
import { CardDragComponent } from './card-drag/card-drag.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ContainerCarouselComponent,
    ContainerComponent,
    TaskListComponent,
    LoginComponent,
    MenuComponent,
    CarouselMinComponent,
    CardMinComponent,
    RegisterComponent,
    CardDragComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule,
    DialogModule,
    TableModule,
    ToastModule,
    FileUploadModule,
    SplitterModule,
    ListboxModule,
    DragDropModule,
    DropdownModule,
    MenubarModule,
    DividerModule,
    InputTextModule,
    CardModule 
  ]
  ,
  providers: [MessageService, 
 // { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }


