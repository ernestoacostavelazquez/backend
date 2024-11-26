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
import { PaisesModule } from './paises/paises.module';
import { ColoresInterioresModule } from './colores-interiores/colores-interiores.module';
import { ColoresExterioresModule } from './colores-exteriores/colores-exteriores.module';
import { SubCategoriasModule } from './sub-categorias/sub-categorias.module';
import { ColoresModule } from './colores/colores.module';
import { TiposCajaModule } from './tipos_caja/tipos_caja.module';
import { BancosModule } from './bancos/bancos.module';
import { CarterasModule } from './carteras/carteras.module';
import { CombustiblesModule } from './combustibles/combustibles.module';
import { ArmadorasModule } from './armadoras/armadoras.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { VersionesModule } from './versiones/versiones.module';
import { TiposCarteraModule } from './tipos_cartera/tipos_cartera.module';
import { CanalesVentaModule } from './canales_venta/canales_venta.module';
import { UnidadesEmpaqueModule } from './unidades_empaque/unidades_empaque.module';
import { FamiliasModule } from './familias/familias.module';

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
    PaisesModule,
    ColoresInterioresModule,
    ColoresExterioresModule,
    SubCategoriasModule,
    ColoresModule,
    TiposCajaModule,
    BancosModule,
    CarterasModule,
    CombustiblesModule,
    ArmadorasModule,
    MarcasModule,
    ModelosModule,
    VersionesModule,
    TiposCarteraModule,
    CanalesVentaModule,
    UnidadesEmpaqueModule,
    FamiliasModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
