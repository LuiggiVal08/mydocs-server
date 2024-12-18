-- CreateTable
CREATE TABLE `Estado` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id` VARCHAR(191) NOT NULL,
    `estadoId` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `nombreDeUsuario` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL DEFAULT '/images/profile-default.png',
    `municipioId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudiante` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Estudiante_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Retiro` (
    `id` VARCHAR(191) NOT NULL,
    `estudianteId` VARCHAR(191) NOT NULL,
    `fechaRetiro` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrador` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `rolId` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Administrador_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialAcciones` (
    `id` VARCHAR(191) NOT NULL,
    `administradorId` VARCHAR(191) NOT NULL,
    `tipoAccion` VARCHAR(191) NOT NULL,
    `entidad` VARCHAR(191) NOT NULL,
    `entidadId` VARCHAR(191) NOT NULL,
    `detalles` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pnf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `periodicidad` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trayecto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `duracion` INTEGER NOT NULL,
    `pnfId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadCurricular` (
    `codigo` INTEGER NOT NULL AUTO_INCREMENT,
    `trayectoId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `creditos` INTEGER NOT NULL,
    `hte` INTEGER NOT NULL,
    `htea` INTEGER NOT NULL,
    `htei` INTEGER NOT NULL,
    `horasSemanales` INTEGER NOT NULL,
    `duracion` INTEGER NOT NULL,
    `notaMinimaAprobatoria` DECIMAL(65, 30) NOT NULL,
    `notaMinimaRecuperacion` DECIMAL(65, 30) NOT NULL,
    `notaMinimaPer` DECIMAL(65, 30) NOT NULL,
    `porcentajeMinAsistencia` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LapsoAcademico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `horario` VARCHAR(191) NOT NULL,
    `aula` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CursoLapso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unidadCurricularId` INTEGER NOT NULL,
    `seccionId` INTEGER NOT NULL,
    `lapsoAcademicoId` INTEGER NOT NULL,
    `profesorId` VARCHAR(191) NOT NULL,
    `horario` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscripcion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaInscripcion` DATETIME(3) NOT NULL,
    `estudianteId` VARCHAR(191) NOT NULL,
    `cursoLapsoId` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Inscripcion_estudianteId_key`(`estudianteId`),
    UNIQUE INDEX `Inscripcion_cursoLapsoId_key`(`cursoLapsoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cursoLapsoId` INTEGER NOT NULL,
    `estudianteId` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` VARCHAR(191) NOT NULL,
    `cursoLapsoId` INTEGER NOT NULL,
    `nota` DECIMAL(65, 30) NOT NULL,
    `modalidad` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL,
    `observaciones` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitud` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallePago` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `banco` VARCHAR(191) NOT NULL,
    `numeroTelefono` VARCHAR(191) NOT NULL,
    `titularNombre` VARCHAR(191) NOT NULL,
    `titularApellido` VARCHAR(191) NOT NULL,
    `numeroCuenta` VARCHAR(191) NOT NULL,
    `cedulaIdentidad` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` VARCHAR(191) NOT NULL,
    `monto` DOUBLE NOT NULL,
    `detalleId` VARCHAR(191) NOT NULL,
    `fechaPago` DATETIME(3) NOT NULL,
    `estadoPago` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitudEstudiante` (
    `id` VARCHAR(191) NOT NULL,
    `estudianteId` VARCHAR(191) NOT NULL,
    `solicitudId` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fechaSolicitud` DATETIME(3) NOT NULL,
    `pagoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Archivero` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nivel` (
    `id` VARCHAR(191) NOT NULL,
    `archiveroId` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carpeta` (
    `id` VARCHAR(191) NOT NULL,
    `estudianteId` VARCHAR(191) NOT NULL,
    `nivelId` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Carpeta_estudianteId_key`(`estudianteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Extension` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentoExtension` (
    `id` VARCHAR(191) NOT NULL,
    `documentoId` VARCHAR(191) NOT NULL,
    `extensionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarpetaDocumento` (
    `id` VARCHAR(191) NOT NULL,
    `carpetaId` VARCHAR(191) NOT NULL,
    `documentoExtensionId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `Municipio_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `Estado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudiante` ADD CONSTRAINT `Estudiante_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Retiro` ADD CONSTRAINT `Retiro_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialAcciones` ADD CONSTRAINT `HistorialAcciones_administradorId_fkey` FOREIGN KEY (`administradorId`) REFERENCES `Administrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trayecto` ADD CONSTRAINT `Trayecto_pnfId_fkey` FOREIGN KEY (`pnfId`) REFERENCES `Pnf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnidadCurricular` ADD CONSTRAINT `UnidadCurricular_trayectoId_fkey` FOREIGN KEY (`trayectoId`) REFERENCES `Trayecto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoLapso` ADD CONSTRAINT `CursoLapso_unidadCurricularId_fkey` FOREIGN KEY (`unidadCurricularId`) REFERENCES `UnidadCurricular`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoLapso` ADD CONSTRAINT `CursoLapso_seccionId_fkey` FOREIGN KEY (`seccionId`) REFERENCES `Seccion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoLapso` ADD CONSTRAINT `CursoLapso_lapsoAcademicoId_fkey` FOREIGN KEY (`lapsoAcademicoId`) REFERENCES `LapsoAcademico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoLapso` ADD CONSTRAINT `CursoLapso_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `Administrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_cursoLapsoId_fkey` FOREIGN KEY (`cursoLapsoId`) REFERENCES `CursoLapso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_cursoLapsoId_fkey` FOREIGN KEY (`cursoLapsoId`) REFERENCES `CursoLapso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notas` ADD CONSTRAINT `Notas_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notas` ADD CONSTRAINT `Notas_cursoLapsoId_fkey` FOREIGN KEY (`cursoLapsoId`) REFERENCES `CursoLapso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_detalleId_fkey` FOREIGN KEY (`detalleId`) REFERENCES `DetallePago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudEstudiante` ADD CONSTRAINT `SolicitudEstudiante_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudEstudiante` ADD CONSTRAINT `SolicitudEstudiante_solicitudId_fkey` FOREIGN KEY (`solicitudId`) REFERENCES `Solicitud`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudEstudiante` ADD CONSTRAINT `SolicitudEstudiante_pagoId_fkey` FOREIGN KEY (`pagoId`) REFERENCES `Pago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nivel` ADD CONSTRAINT `Nivel_archiveroId_fkey` FOREIGN KEY (`archiveroId`) REFERENCES `Archivero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carpeta` ADD CONSTRAINT `Carpeta_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carpeta` ADD CONSTRAINT `Carpeta_nivelId_fkey` FOREIGN KEY (`nivelId`) REFERENCES `Nivel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoExtension` ADD CONSTRAINT `DocumentoExtension_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `Documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoExtension` ADD CONSTRAINT `DocumentoExtension_extensionId_fkey` FOREIGN KEY (`extensionId`) REFERENCES `Extension`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarpetaDocumento` ADD CONSTRAINT `CarpetaDocumento_carpetaId_fkey` FOREIGN KEY (`carpetaId`) REFERENCES `Carpeta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarpetaDocumento` ADD CONSTRAINT `CarpetaDocumento_documentoExtensionId_fkey` FOREIGN KEY (`documentoExtensionId`) REFERENCES `DocumentoExtension`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
