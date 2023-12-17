import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsPage } from './pages/programs/programs-page.component';
import { ProgramsDetailsPage } from './pages/programs-details/programs-details-page.component';
import { MainPageComponent } from './pages/main/main-page.component';
import { AppLayoutComponent } from './layouts/app/app-layout.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'main',
                component: MainPageComponent
            }
        ]
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        children: [
            {
                path: 'programs',
                component: ProgramsPage
            },
            {
                path: 'programs/:id',
                component: ProgramsDetailsPage
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
