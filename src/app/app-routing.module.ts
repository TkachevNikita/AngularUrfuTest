import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProgramsPage } from './pages/programs/programs-page.component';
import { ProgramsDetailsPage } from './pages/programs-details/programs-details-page.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/programs',
      pathMatch: 'full'
  },
  {
      path: 'programs',
      component: ProgramsPage
  },
  {
    path: 'programs/:id',
    component: ProgramsDetailsPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
