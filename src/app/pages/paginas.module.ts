import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//EXTERNOS
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MomentModule } from 'ngx-moment';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//DIRECTIVAS
import { NumerosDirective } from '../directivas/numeros/numeros.directive';
import { MayusculasDirective } from '../directivas/mayusculas/mayusculas.directive';


//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PaginasComponent } from './paginas.component';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { ComponentesReutilizablesModule } from "../componentes-reutilizables/componentes-reutilizables.module";

//RUTAS
import { PAGES_ROUTES } from './paginas.routes';
import { CuentaConfiguracionesComponent } from './cuenta-configuraciones/cuenta-configuraciones.component';
import { GeografiaComponent } from './geografia/geografia.component';
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
import { PersonaComponent } from './persona/persona.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MenuComponent } from './menu/menu.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { AgendaComponent } from './agenda/agenda.component';


@NgModule({
    declarations:[
        NumerosDirective,
        MayusculasDirective,
        PaginasComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        CuentaConfiguracionesComponent,
        GeografiaComponent,
        TipoIdentificacionComponent,
        ProfesionesComponent,
        NivelEducacionComponent,
        PerfilComponent,
        EspecialidadComponent,
        TiposOrganosSistemasComponent,
        TiposExamenComponent,
        AuxiliarDiagnosticoComponent,
        CaptacionVacunasComponent,
        GrupoAntecedentesComponent,
        GrupoSanguineoComponent,
        EtniaComponent,
        TipoSeguroComponent,
        TipoDiscapacidadComponent,
        Cie10Component,
        EmpresaComponent,
        PersonaComponent,
        UsuariosComponent,
        UsuarioComponent,
        MenuComponent,
        AgendaComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        ComponentesReutilizablesModule,
        FormsModule,
        ChartsModule,
        NgSelectModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        MomentModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgbModule
    ]
})

export class PagesModule { }