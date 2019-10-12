import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: 'calculation', component: CalculationComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
