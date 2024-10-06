import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineasModule } from './lineas/lineas.module';
import { TiposPolizaModule } from './tipos-poliza/tipos-poliza.module';
import { PeriodosContablesModule } from './periodos-contables/periodos-contables.module';
import { CuentasContablesModule } from './cuentas-contables/cuentas-contables.module';
import { PolizasContablesModule } from './polizas-contables/polizas-contables.module';
import { DetallesPolizasModule } from './detalles-polizas/detalles-polizas.module';
import { SaldosPeriodosModule } from './saldos-periodos/saldos-periodos.module';
import { FoliosPolizasPeriodoModule } from './folios-polizas-periodo/folios-polizas-periodo.module';
import { MaestroPartesModule } from './maestro_partes/maestro_partes.module';
import { UnidadMedidaModule } from './unidad_medida/unidad_medida.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PartesAlmacenModule } from './partes_almacen/partes_almacen.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { UbicacionesAlmacenModule } from './ubicaciones_almacen/ubicaciones_almacen.module';
import { GenerosModule } from './generos/generos.module';
import { TiposPersonaModule } from './tipos_persona/tipos_persona.module';
import { RolesModule } from './roles/roles.module';
import { EstadosCivilModule } from './estados_civil/estados_civil.module';
import { TiposDomiciliosModule } from './tipos_domicilios/tipos_domicilios.module';
import { RolesPersonaModule } from './roles_persona/roles_persona.module';
import { DomiciliosPersonaModule } from './domicilios_persona/domicilios_persona.module';
import { CodigosPostalesModule } from './codigos_postales/codigos_postales.module';
import { MaestroPersonasModule } from './maestro_personas/maestro_personas.module';
import { PersonasFisicasModule } from './personas_fisicas/personas_fisicas.module';
import { PersonasMoralesModule } from './personas_morales/personas_morales.module';
import { GenerosCuentasContablesModule } from './generos_cuentas_contables/generos_cuentas_contables.module';
import { GruposGenerosCuentasModule } from './grupos_generos_cuentas/grupos_generos_cuentas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'sgedb',
      entities:[__dirname +'/**/*.entity{.ts,.js}'],
      synchronize:true
    }),
    UsersModule,
    LineasModule,
    TiposPolizaModule,
    PeriodosContablesModule,
    CuentasContablesModule,
    PolizasContablesModule,
    DetallesPolizasModule,
    SaldosPeriodosModule,
    FoliosPolizasPeriodoModule,
    MaestroPartesModule,
    UnidadMedidaModule,
    CategoriasModule,
    PartesAlmacenModule,
    AlmacenesModule,
    UbicacionesAlmacenModule,
    GenerosModule,
    TiposPersonaModule,
    RolesModule,
    EstadosCivilModule,
    TiposDomiciliosModule,
    DomiciliosPersonaModule,
    RolesPersonaModule,
    CodigosPostalesModule,
    MaestroPersonasModule,
    PersonasFisicasModule,
    PersonasMoralesModule,
    GenerosCuentasContablesModule,
    GruposGenerosCuentasModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
