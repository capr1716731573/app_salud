import { Routes, RouterModule } from "@angular/router";
//Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

const appRoutes: Routes=[
    

   
    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
   
    //{ path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash:true });

