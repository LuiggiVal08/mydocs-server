-- CreateTable
CREATE TABLE "Estado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estadoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    CONSTRAINT "Municipio_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dni" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "nombreDeUsuario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '/images/profile-default.png',
    "municipioId" TEXT NOT NULL,
    CONSTRAINT "Usuario_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Estudiante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Retiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estudianteId" TEXT NOT NULL,
    "fechaRetiro" DATETIME NOT NULL,
    "motivo" TEXT,
    "observaciones" TEXT,
    CONSTRAINT "Retiro_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Administrador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Administrador_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistorialAcciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "administradorId" TEXT NOT NULL,
    "tipoAccion" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidadId" TEXT NOT NULL,
    "detalles" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    CONSTRAINT "HistorialAcciones_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "Administrador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pnf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "periodicidad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Trayecto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "pnfId" INTEGER NOT NULL,
    CONSTRAINT "Trayecto_pnfId_fkey" FOREIGN KEY ("pnfId") REFERENCES "Pnf" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnidadCurricular" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trayectoId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "hte" INTEGER NOT NULL,
    "htea" INTEGER NOT NULL,
    "htei" INTEGER NOT NULL,
    "horasSemanales" INTEGER NOT NULL,
    "duracion" INTEGER NOT NULL,
    "notaMinimaAprobatoria" DECIMAL NOT NULL,
    "notaMinimaRecuperacion" DECIMAL NOT NULL,
    "notaMinimaPer" DECIMAL NOT NULL,
    "porcentajeMinAsistencia" DECIMAL NOT NULL,
    CONSTRAINT "UnidadCurricular_trayectoId_fkey" FOREIGN KEY ("trayectoId") REFERENCES "Trayecto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LapsoAcademico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Seccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "aula" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CursoLapso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unidadCurricularId" INTEGER NOT NULL,
    "seccionId" INTEGER NOT NULL,
    "lapsoAcademicoId" INTEGER NOT NULL,
    "profesorId" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    CONSTRAINT "CursoLapso_unidadCurricularId_fkey" FOREIGN KEY ("unidadCurricularId") REFERENCES "UnidadCurricular" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CursoLapso_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CursoLapso_lapsoAcademicoId_fkey" FOREIGN KEY ("lapsoAcademicoId") REFERENCES "LapsoAcademico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CursoLapso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Administrador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fechaInscripcion" DATETIME NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "cursoLapsoId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    CONSTRAINT "Inscripcion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inscripcion_cursoLapsoId_fkey" FOREIGN KEY ("cursoLapsoId") REFERENCES "CursoLapso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cursoLapsoId" INTEGER NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    CONSTRAINT "Asistencia_cursoLapsoId_fkey" FOREIGN KEY ("cursoLapsoId") REFERENCES "CursoLapso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asistencia_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estudianteId" TEXT NOT NULL,
    "cursoLapsoId" INTEGER NOT NULL,
    "nota" DECIMAL NOT NULL,
    "modalidad" TEXT NOT NULL,
    "fechaRegistro" DATETIME NOT NULL,
    "observaciones" TEXT NOT NULL,
    CONSTRAINT "Notas_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Notas_cursoLapsoId_fkey" FOREIGN KEY ("cursoLapsoId") REFERENCES "CursoLapso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "DetallePago" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "titularNombre" TEXT NOT NULL,
    "titularApellido" TEXT NOT NULL,
    "numeroCuenta" TEXT NOT NULL,
    "cedulaIdentidad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monto" REAL NOT NULL,
    "detalleId" TEXT NOT NULL,
    "fechaPago" DATETIME NOT NULL,
    "estadoPago" TEXT NOT NULL,
    CONSTRAINT "Pago_detalleId_fkey" FOREIGN KEY ("detalleId") REFERENCES "DetallePago" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SolicitudEstudiante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estudianteId" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fechaSolicitud" DATETIME NOT NULL,
    "pagoId" TEXT NOT NULL,
    CONSTRAINT "SolicitudEstudiante_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SolicitudEstudiante_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SolicitudEstudiante_pagoId_fkey" FOREIGN KEY ("pagoId") REFERENCES "Pago" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Archivero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nivel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "archiveroId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    CONSTRAINT "Nivel_archiveroId_fkey" FOREIGN KEY ("archiveroId") REFERENCES "Archivero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carpeta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estudianteId" TEXT NOT NULL,
    "nivelId" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    CONSTRAINT "Carpeta_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carpeta_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Extension" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DocumentoExtension" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentoId" TEXT NOT NULL,
    "extensionId" TEXT NOT NULL,
    CONSTRAINT "DocumentoExtension_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "Documento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentoExtension_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CarpetaDocumento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carpetaId" TEXT NOT NULL,
    "documentoExtensionId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "CarpetaDocumento_carpetaId_fkey" FOREIGN KEY ("carpetaId") REFERENCES "Carpeta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CarpetaDocumento_documentoExtensionId_fkey" FOREIGN KEY ("documentoExtensionId") REFERENCES "DocumentoExtension" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "Usuario"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_usuarioId_key" ON "Estudiante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuarioId_key" ON "Administrador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_estudianteId_key" ON "Inscripcion"("estudianteId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_cursoLapsoId_key" ON "Inscripcion"("cursoLapsoId");

-- CreateIndex
CREATE UNIQUE INDEX "Carpeta_estudianteId_key" ON "Carpeta"("estudianteId");
