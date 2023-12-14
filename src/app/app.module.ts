import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgramsPage } from './pages/programs/programs-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProgramComponent } from './components/program/program.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgramsDetailsPage } from './pages/programs-details/programs-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProgramsPage,
    ProgramComponent,
    PaginationComponent,
    ProgramsDetailsPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
