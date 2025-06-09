import { Routes } from '@angular/router';
import { MainComponent } from './komponenty/main/main.component';
import { CreateComponent } from './komponenty/create/create.component';
export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainComponent},
    { path: 'create', component: CreateComponent},
];
