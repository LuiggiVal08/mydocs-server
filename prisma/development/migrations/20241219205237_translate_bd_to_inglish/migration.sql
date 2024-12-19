/*
  Warnings:

  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Archivero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Asistencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Carpeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarpetaDocumento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CursoLapso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetallePago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Documento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentoExtension` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estudiante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistorialAcciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inscripcion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LapsoAcademico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Municipio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nivel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Retiro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Solicitud` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolicitudEstudiante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trayecto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnidadCurricular` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nombre` on the `Extension` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Pnf` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Pnf` table. All the data in the column will be lost.
  - You are about to drop the column `periodicidad` on the `Pnf` table. All the data in the column will be lost.
  - Added the required column `name` to the `Extension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Pnf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pnf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodicity` to the `Pnf` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Administrador_usuarioId_key";

-- DropIndex
DROP INDEX "Carpeta_estudianteId_key";

-- DropIndex
DROP INDEX "Estudiante_usuarioId_key";

-- DropIndex
DROP INDEX "Inscripcion_cursoLapsoId_key";

-- DropIndex
DROP INDEX "Inscripcion_estudianteId_key";

-- DropIndex
DROP INDEX "Usuario_dni_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Administrador";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Archivero";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Asistencia";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Carpeta";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CarpetaDocumento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CursoLapso";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DetallePago";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Documento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DocumentoExtension";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estado";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estudiante";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HistorialAcciones";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Inscripcion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LapsoAcademico";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Municipio";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Nivel";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Notas";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pago";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Retiro";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rol";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Seccion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Solicitud";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SolicitudEstudiante";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Trayecto";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UnidadCurricular";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Municipality_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dni" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '/images/profile-default.png',
    "municipalityId" TEXT NOT NULL,
    CONSTRAINT "User_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "withdrawalDate" DATETIME NOT NULL,
    "reason" TEXT,
    "observations" TEXT,
    CONSTRAINT "Withdrawal_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Administrator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Administrator_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "administratorId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "ActionHistory_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "Administrator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trajectory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "pnfId" INTEGER NOT NULL,
    CONSTRAINT "Trajectory_pnfId_fkey" FOREIGN KEY ("pnfId") REFERENCES "Pnf" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurricularUnit" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trajectoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "hte" INTEGER NOT NULL,
    "htea" INTEGER NOT NULL,
    "htei" INTEGER NOT NULL,
    "weeklyHours" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "minPassingGrade" DECIMAL NOT NULL,
    "minRecoveryGrade" DECIMAL NOT NULL,
    "minPerGrade" DECIMAL NOT NULL,
    "minAttendanceRate" DECIMAL NOT NULL,
    CONSTRAINT "CurricularUnit_trajectoryId_fkey" FOREIGN KEY ("trajectoryId") REFERENCES "Trajectory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AcademicPeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "classroom" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CoursePeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "curricularUnitId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "academicPeriodId" INTEGER NOT NULL,
    "professorId" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "CoursePeriod_curricularUnitId_fkey" FOREIGN KEY ("curricularUnitId") REFERENCES "CurricularUnit" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoursePeriod_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoursePeriod_academicPeriodId_fkey" FOREIGN KEY ("academicPeriodId") REFERENCES "AcademicPeriod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoursePeriod_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Administrator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enrollmentDate" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "coursePeriodId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_coursePeriodId_fkey" FOREIGN KEY ("coursePeriodId") REFERENCES "CoursePeriod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coursePeriodId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    CONSTRAINT "Attendance_coursePeriodId_fkey" FOREIGN KEY ("coursePeriodId") REFERENCES "CoursePeriod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" TEXT NOT NULL,
    "coursePeriodId" INTEGER NOT NULL,
    "grade" DECIMAL NOT NULL,
    "modality" TEXT NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "observations" TEXT NOT NULL,
    CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Grade_coursePeriodId_fkey" FOREIGN KEY ("coursePeriodId") REFERENCES "CoursePeriod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "holderFirstName" TEXT NOT NULL,
    "holderLastName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "identityCard" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "detailId" TEXT NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    CONSTRAINT "Payment_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "PaymentDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "requestDate" DATETIME NOT NULL,
    "paymentId" TEXT NOT NULL,
    CONSTRAINT "StudentRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentRequest_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilingCabinet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filingCabinetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "Level_filingCabinetId_fkey" FOREIGN KEY ("filingCabinetId") REFERENCES "FilingCabinet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    CONSTRAINT "Folder_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Folder_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DocumentExtension" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "extensionId" TEXT NOT NULL,
    CONSTRAINT "DocumentExtension_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentExtension_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FolderDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "folderId" TEXT NOT NULL,
    "documentExtensionId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "FolderDocument_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FolderDocument_documentExtensionId_fkey" FOREIGN KEY ("documentExtensionId") REFERENCES "DocumentExtension" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Extension" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Extension" ("id") SELECT "id" FROM "Extension";
DROP TABLE "Extension";
ALTER TABLE "new_Extension" RENAME TO "Extension";
CREATE TABLE "new_Pnf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "periodicity" TEXT NOT NULL
);
INSERT INTO "new_Pnf" ("id") SELECT "id" FROM "Pnf";
DROP TABLE "Pnf";
ALTER TABLE "new_Pnf" RENAME TO "Pnf";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_userId_key" ON "Administrator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_key" ON "Enrollment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_coursePeriodId_key" ON "Enrollment"("coursePeriodId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_studentId_key" ON "Folder"("studentId");
