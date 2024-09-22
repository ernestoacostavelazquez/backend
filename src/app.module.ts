import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineasModule } from './lineas/lineas.module';
import { TiposCuentasContablesModule } from './tipos-cuentas-contables/tipos-cuentas-contables.module';
import { SubdivisionCuentasContablesModule } from './subdivision-cuentas-contables/subdivision-cuentas-contables.module';
import { TiposPolizaModule } from './tipos-poliza/tipos-poliza.module';
import { PeriodosContablesModule } from './periodos-contables/periodos-contables.module';
import { CuentasContablesModule } from './cuentas-contables/cuentas-contables.module';
import { PolizasContablesModule } from './polizas-contables/polizas-contables.module';
import { DetallesPolizasModule } from './detalles-polizas/detalles-polizas.module';
import { SaldosPeriodosModule } from './saldos-periodos/saldos-periodos.module';

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
    TiposCuentasContablesModule,
    SubdivisionCuentasContablesModule,
    TiposPolizaModule,
    PeriodosContablesModule,
    CuentasContablesModule,
    PolizasContablesModule,
    DetallesPolizasModule,
    SaldosPeriodosModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
