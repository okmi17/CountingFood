CREATE DATABASE Restaurante;

USE Restaurante;

create table EMPLEADO
(
   IDENTIFICACION       int not null,
   NOMBRE               varchar(100)  null,
   APELLIDO             varchar(100)  null,
   EDAD                 int  null,
   FECHADENACIMIENTO    date  null,
   CORREO               varchar(100)  null,
   SUELDOBASICO         decimal  null,
   CONTRASENA           varchar(100)  null,
   PENSIONES            varchar(100)  null,
   EPS                  varchar(100)  null,
   CARGO                varchar(100) not null,
   FECHAINGRESO         date  null,
   CESANTIAS            varchar(100) null,
   primary key (IDENTIFICACION, CARGO)
);

/*==============================================================*/
/* Table: FACTURA                                               */
/*==============================================================*/
create table FACTURA
(
   IDFACTURA            int not null,
   IDENTIFICACION       int not null,
   CARGO                varchar(100) not null,
   NITRESTAURANTE       int not null,
   TOTAL                decimal,
   primary key (IDFACTURA)
);

/*==============================================================*/
/* Table: GASTOS                                                */
/*==============================================================*/
create table GASTOS
(
   IDGASTO              int not null,
   IDENTIFICACION       int not null,
   CARGO                varchar(100) not null,
   MOTIVOGASTO          varchar(1024) not null,
   FECHAGASTO           date not null,
   VALORGASTO           decimal not null,
   primary key (IDGASTO)
);

/*==============================================================*/
/* Table: NOMINA                                                */
/*==============================================================*/
create table NOMINA
(
   IDNOMINA             int not null,
   IDENTIFICACION       int not null,
   CARGO                varchar(100) not null,
   FECHAINICIO          date not null,
   FECHAFIN             date not null,
   SUELDOQUINCENAL      decimal not null,
   primary key (IDNOMINA)
);

/*==============================================================*/
/* Table: NOVEDADES                                             */
/*==============================================================*/
create table NOVEDADES
(
   IDNOVEDAD            int not null,
   IDENTIFICACION       int not null,
   CARGO                varchar(100) not null,
   IDNOMINA             int not null,
   HORASADICIONALES     int not null,
   CODIGOHORA           int not null,
   DINEROADICIONAL      decimal not null,
   MOTIVONOVEDAD        varchar(1024) not null,
   primary key (IDNOVEDAD)
);

/*==============================================================*/
/* Table: PERMISOS                                              */
/*==============================================================*/
create table PERMISOS
(
   IDPERMISO            int not null,
   IDENTIFICACION       int not null,
   CARGO                varchar(100) not null,
   FECHAPERMISO         date not null,
   MOTIVOPERMISO        varchar(1024) not null,
   TIPOPERMISO          varchar(30) not null,
   HORAPERMISO          time,
   primary key (IDPERMISO)
);

/*==============================================================*/
/* Table: PLATO                                                 */
/*==============================================================*/
create table PLATO
(
   IDPLATO              int not null,
   NOMBREPLATO          varchar(1024) not null,
   PRECIOCLIENTE        decimal not null,
   TIPOPLATO            varchar(1024) not null,
   primary key (IDPLATO)
);

/*==============================================================*/
/* Table: PLATOPRODUCTO                                         */
/*==============================================================*/
create table PLATOPRODUCTO
(
   IDPRODUCTO           varchar(30) not null,
   IDPLATO              int not null,
   CANTIDADPORCION      decimal not null,
   primary key (IDPRODUCTO, IDPLATO)
);

/*==============================================================*/
/* Table: POSEER                                                */
/*==============================================================*/
create table POSEER
(
   IDFACTURA            int not null,
   IDPLATO              int not null,
   HORA                 time not null,
   FECHA                date not null,
   primary key (IDFACTURA, IDPLATO)
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
create table PRODUCTO
(
   IDPRODUCTO           varchar(30) not null,
   NOMBREPRODUCTO       varchar(30) not null,
   TIPOPRODUCTO         varchar(100) not null,
   DESCRIPCIONPRODUCTO  varchar(100) not null,
   CANTIDADINVENTARIO   int not null,
   COSTO                decimal not null,
   CANTIDADPORCION      decimal not null,
   primary key (IDPRODUCTO)
);

/*==============================================================*/
/* Table: TURNO                                                 */
/*==============================================================*/
create table TURNO
(
   IDTURNO              int not null,
   IDENTIFICACION       int not null,
   CARGO                varchar(100) not null,
   DIA                  varchar(30) not null,
   FECHATURNO           date not null,
   TURNOINICIAL         time not null,
   TURNOFINAL           time not null,
   ADMINTURNO           varchar(30) not null,
   HORAENTRADA          time,
   HORASALIDA           time,
   HORASTRABAJADAS      int,
   primary key (IDTURNO)
);

alter table FACTURA add constraint FK_FACTURAR foreign key (IDENTIFICACION, CARGO)
      references EMPLEADO (IDENTIFICACION, CARGO) on delete restrict on update restrict;

alter table GASTOS add constraint FK_REALIZAR foreign key (IDENTIFICACION, CARGO)
      references EMPLEADO (IDENTIFICACION, CARGO) on delete restrict on update restrict;

alter table NOMINA add constraint FK_TIENE foreign key (IDENTIFICACION, CARGO)
      references EMPLEADO (IDENTIFICACION, CARGO) on delete restrict on update restrict;

alter table NOVEDADES add constraint FK_POSEE foreign key (IDENTIFICACION, CARGO)
      references EMPLEADO (IDENTIFICACION, CARGO) on delete restrict on update restrict;

alter table NOVEDADES add constraint FK_POSEENOVEDAD foreign key (IDNOMINA)
      references NOMINA (IDNOMINA) on delete restrict on update restrict;

alter table PERMISOS add constraint FK_PIDE foreign key (IDENTIFICACION, CARGO)
      references EMPLEADO (IDENTIFICACION, CARGO) on delete restrict on update restrict;

alter table PLATOPRODUCTO add constraint FK_PLATOPRODUCTO foreign key (IDPRODUCTO)
      references PRODUCTO (IDPRODUCTO) on delete restrict on update restrict;

alter table PLATOPRODUCTO add constraint FK_PLATOPRODUCTO2 foreign key (IDPLATO)
      references PLATO (IDPLATO) on delete restrict on update restrict;

alter table POSEER add constraint FK_POSEER foreign key (IDFACTURA)
      references FACTURA (IDFACTURA) on delete restrict on update restrict;

alter table POSEER add constraint FK_POSEER2 foreign key (IDPLATO)
      references PLATO (IDPLATO) on delete restrict on update restrict;

alter table TURNO add constraint FK_CREA foreign key (IDENTIFICACION, CARGO)
      references EMPLEADO (IDENTIFICACION, CARGO) on delete restrict on update restrict;
