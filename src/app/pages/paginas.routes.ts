import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PaginasComponent } from "./paginas.component";
import { ProgressComponent } from "./progress/progress.component";
import { CuentaConfiguracionesComponent } from "./cuenta-configuraciones/cuenta-configuraciones.component";
import { GeografiaComponent } from './geografia/geografia.component';
import { VerificarTokenGuard } from '../guards/verificar-token.guard';
import { TipoIdentificacionComponent } from './tipo-identificacion/tipo-identificacion.component';
import { ProfesionesComponent } from './profesiones/profesiones.component';
import { NivelEducacionComponent } from './nivel-educacion/nivel-educacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { TiposOrganosSistemasComponent } from './tipos-organos-sistemas/tipos-organos-sistemas.component';
import { TiposExamenComponent } from './tipos-examen/tipos-examen.component';
import { AuxiliarDiagnosticoComponent } from './auxiliar-diagnostico/auxiliar-diagnostico.component';
import { CaptacionVacunasComponent } from './captacion-vacunas/captacion-vacunas.component';
import { GrupoAntecedentesComponent } from './grupo-antecedentes/grupo-antecedentes.component';
import { GrupoSanguineoComponent } from './grupo-sanguineo/grupo-sanguineo.component';
import { EtniaComponent } from './etnia/etnia.component';
import { TipoSeguroComponent } from './tipo-seguro/tipo-seguro.component';
import { TipoDiscapacidadComponent } from './tipo-discapacidad/tipo-discapacidad.component';
import { Cie10Component } from './cie10/cie10.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { MenuComponent } from './menu/menu.component';

const pagesRoutes: Routes=[
    //RUTA DE PAGINAS O DE PAGINA PRINCIPAL QUE TIENE TODO HEADER , SIDEBAR , MAIN PAGE
    //ES DECIR PRIMER ROUTER OUTLET
    //ESTE CAMBIO SE HACE DEBIDO A QUE EL LOGIN Y REGISTER SE REDIRECCIONAN A OTRA PAGINA 
    //TOTALMENTE DISTINTA, QUE NO UTILIZA NINGUN COMPONENTE DE 
    { 
        path:'', 
        component: PaginasComponent,
        children:[
            { path:'dashboard', component: DashboardComponent ,data:{ titulo:'Inicio'},canActivate:[VerificarTokenGuard]},
            { path:'progress', component: ProgressComponent ,data:{ titulo:'Ejemplo Progress'},canActivate:[VerificarTokenGuard]},
            { path:'graficas1', component: Graficas1Component ,data:{ titulo:'Graficas'},canActivate:[VerificarTokenGuard]},
            { path:'account-settings', component: CuentaConfiguracionesComponent ,data:{ titulo:'Personalización'},canActivate:[VerificarTokenGuard]},
            //Tablas Basicas
            { path:'geografia', component: GeografiaComponent ,data:{ titulo:'Geografía'},canActivate:[VerificarTokenGuard]},
            { path:'tipo-identificacion', component: TipoIdentificacionComponent ,data:{ titulo:'Tipo de Indetificación'},canActivate:[VerificarTokenGuard]},
            { path:'profesion', component: ProfesionesComponent ,data:{ titulo:'Profesiones'},canActivate:[VerificarTokenGuard]},
            { path:'nivel-educacion', component: NivelEducacionComponent ,data:{ titulo:'Nivel Educación'},canActivate:[VerificarTokenGuard]},
            { path:'perfil', component: PerfilComponent ,data:{ titulo:'Gestión de Perfiles'},canActivate:[VerificarTokenGuard]},
            { path:'especialidad', component: EspecialidadComponent ,data:{ titulo:'Tipos de Especialidades'},canActivate:[VerificarTokenGuard]},
            { path:'tipo-organos-sistemas', component: TiposOrganosSistemasComponent ,data:{ titulo:'Tipos de Órganos y Sistemas'},canActivate:[VerificarTokenGuard]},
            { path:'tipo-examen', component: TiposExamenComponent ,data:{ titulo:'Tipos de Examén'},canActivate:[VerificarTokenGuard]},
            { path:'auxiliar-diagnostico', component: AuxiliarDiagnosticoComponent ,data:{ titulo:'Auxiliar de Diagnostico'},canActivate:[VerificarTokenGuard]},
            { path:'captacion-vacunas', component: CaptacionVacunasComponent ,data:{ titulo:'Captación de Vacunas'},canActivate:[VerificarTokenGuard]},
            { path:'grupo-antecedentes', component: GrupoAntecedentesComponent ,data:{ titulo:'Grupo de Antecedentes'},canActivate:[VerificarTokenGuard]},
            { path:'grupo-sanguineo', component: GrupoSanguineoComponent ,data:{ titulo:'Grupo Sanguineo'},canActivate:[VerificarTokenGuard]},
            { path:'etnia', component: EtniaComponent ,data:{ titulo:'Etnia'},canActivate:[VerificarTokenGuard]},
            { path:'tipo-seguro', component: TipoSeguroComponent ,data:{ titulo:'Tipo Seguro'},canActivate:[VerificarTokenGuard]},
            { path:'tipo-discapacidad', component: TipoDiscapacidadComponent ,data:{ titulo:'Tipo Discapacidad'},canActivate:[VerificarTokenGuard]},
            { path:'cie10', component: Cie10Component ,data:{ titulo:'CIE 10'},canActivate:[VerificarTokenGuard]},
            { path:'empresa', component: EmpresaComponent ,data:{ titulo:'Empresas'},canActivate:[VerificarTokenGuard]},
            { path:'usuarios', component: UsuariosComponent ,data:{ titulo:'Usuarios'},canActivate:[VerificarTokenGuard]},
            { path:'usuario/:id', component: UsuarioComponent ,data:{ titulo:'Registro Usuario'},canActivate:[VerificarTokenGuard]},
            { path:'menu', component: MenuComponent ,data:{ titulo:'Menú del Sistema'},canActivate:[VerificarTokenGuard]},
            { path:'', redirectTo:'/dashboard', pathMatch:'full' }
        ] }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes); 

