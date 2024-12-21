
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.1.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.1.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.StateScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.MunicipalityScalarFieldEnum = {
  id: 'id',
  stateId: 'stateId',
  name: 'name'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  dni: 'dni',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  email: 'email',
  phone: 'phone',
  password: 'password',
  address: 'address',
  gender: 'gender',
  avatar: 'avatar',
  municipalityId: 'municipalityId'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  active: 'active'
};

exports.Prisma.WithdrawalScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  withdrawalDate: 'withdrawalDate',
  reason: 'reason',
  observations: 'observations'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.AdministratorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  roleId: 'roleId',
  status: 'status'
};

exports.Prisma.ActionHistoryScalarFieldEnum = {
  id: 'id',
  administratorId: 'administratorId',
  actionType: 'actionType',
  entity: 'entity',
  entityId: 'entityId',
  details: 'details',
  date: 'date'
};

exports.Prisma.PnfScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  periodicity: 'periodicity'
};

exports.Prisma.TrajectoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  duration: 'duration',
  pnfId: 'pnfId'
};

exports.Prisma.CurricularUnitScalarFieldEnum = {
  code: 'code',
  trajectoryId: 'trajectoryId',
  name: 'name',
  credits: 'credits',
  hte: 'hte',
  htea: 'htea',
  htei: 'htei',
  weeklyHours: 'weeklyHours',
  duration: 'duration',
  minPassingGrade: 'minPassingGrade',
  minRecoveryGrade: 'minRecoveryGrade',
  minPerGrade: 'minPerGrade',
  minAttendanceRate: 'minAttendanceRate'
};

exports.Prisma.AcademicPeriodScalarFieldEnum = {
  id: 'id',
  name: 'name',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.SectionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  schedule: 'schedule',
  classroom: 'classroom',
  capacity: 'capacity'
};

exports.Prisma.CoursePeriodScalarFieldEnum = {
  id: 'id',
  curricularUnitId: 'curricularUnitId',
  sectionId: 'sectionId',
  academicPeriodId: 'academicPeriodId',
  professorId: 'professorId',
  schedule: 'schedule',
  status: 'status'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  enrollmentDate: 'enrollmentDate',
  studentId: 'studentId',
  coursePeriodId: 'coursePeriodId',
  status: 'status',
  observations: 'observations'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  coursePeriodId: 'coursePeriodId',
  studentId: 'studentId',
  date: 'date',
  status: 'status',
  observations: 'observations'
};

exports.Prisma.GradeScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  coursePeriodId: 'coursePeriodId',
  grade: 'grade',
  modality: 'modality',
  registrationDate: 'registrationDate',
  observations: 'observations'
};

exports.Prisma.RequestScalarFieldEnum = {
  id: 'id',
  name: 'name',
  price: 'price'
};

exports.Prisma.PaymentDetailScalarFieldEnum = {
  id: 'id',
  type: 'type',
  bank: 'bank',
  phoneNumber: 'phoneNumber',
  holderFirstName: 'holderFirstName',
  holderLastName: 'holderLastName',
  accountNumber: 'accountNumber',
  identityCard: 'identityCard'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  detailId: 'detailId',
  paymentDate: 'paymentDate',
  paymentStatus: 'paymentStatus'
};

exports.Prisma.StudentRequestScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  requestId: 'requestId',
  status: 'status',
  requestDate: 'requestDate',
  paymentId: 'paymentId'
};

exports.Prisma.FilingCabinetScalarFieldEnum = {
  id: 'id',
  name: 'name',
  status: 'status',
  location: 'location'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  filingCabinetId: 'filingCabinetId',
  name: 'name',
  capacity: 'capacity',
  status: 'status'
};

exports.Prisma.FolderScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  levelId: 'levelId',
  location: 'location'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.ExtensionScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.DocumentExtensionScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  extensionId: 'extensionId'
};

exports.Prisma.FolderDocumentScalarFieldEnum = {
  id: 'id',
  folderId: 'folderId',
  documentExtensionId: 'documentExtensionId',
  url: 'url'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.StateOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.MunicipalityOrderByRelevanceFieldEnum = {
  id: 'id',
  stateId: 'stateId',
  name: 'name'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  dni: 'dni',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  email: 'email',
  phone: 'phone',
  password: 'password',
  address: 'address',
  gender: 'gender',
  avatar: 'avatar',
  municipalityId: 'municipalityId'
};

exports.Prisma.StudentOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.WithdrawalOrderByRelevanceFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  reason: 'reason',
  observations: 'observations'
};

exports.Prisma.RoleOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.AdministratorOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  roleId: 'roleId',
  status: 'status'
};

exports.Prisma.ActionHistoryOrderByRelevanceFieldEnum = {
  id: 'id',
  administratorId: 'administratorId',
  actionType: 'actionType',
  entity: 'entity',
  entityId: 'entityId',
  details: 'details'
};

exports.Prisma.PnfOrderByRelevanceFieldEnum = {
  name: 'name',
  description: 'description',
  periodicity: 'periodicity'
};

exports.Prisma.TrajectoryOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.CurricularUnitOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.AcademicPeriodOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.SectionOrderByRelevanceFieldEnum = {
  name: 'name',
  schedule: 'schedule',
  classroom: 'classroom'
};

exports.Prisma.CoursePeriodOrderByRelevanceFieldEnum = {
  professorId: 'professorId',
  schedule: 'schedule',
  status: 'status'
};

exports.Prisma.EnrollmentOrderByRelevanceFieldEnum = {
  studentId: 'studentId',
  status: 'status',
  observations: 'observations'
};

exports.Prisma.AttendanceOrderByRelevanceFieldEnum = {
  studentId: 'studentId',
  status: 'status',
  observations: 'observations'
};

exports.Prisma.GradeOrderByRelevanceFieldEnum = {
  studentId: 'studentId',
  modality: 'modality',
  observations: 'observations'
};

exports.Prisma.RequestOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PaymentDetailOrderByRelevanceFieldEnum = {
  id: 'id',
  type: 'type',
  bank: 'bank',
  phoneNumber: 'phoneNumber',
  holderFirstName: 'holderFirstName',
  holderLastName: 'holderLastName',
  accountNumber: 'accountNumber',
  identityCard: 'identityCard'
};

exports.Prisma.PaymentOrderByRelevanceFieldEnum = {
  id: 'id',
  detailId: 'detailId',
  paymentStatus: 'paymentStatus'
};

exports.Prisma.StudentRequestOrderByRelevanceFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  requestId: 'requestId',
  status: 'status',
  paymentId: 'paymentId'
};

exports.Prisma.FilingCabinetOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  status: 'status',
  location: 'location'
};

exports.Prisma.LevelOrderByRelevanceFieldEnum = {
  id: 'id',
  filingCabinetId: 'filingCabinetId',
  name: 'name'
};

exports.Prisma.FolderOrderByRelevanceFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  levelId: 'levelId',
  location: 'location'
};

exports.Prisma.DocumentOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.ExtensionOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.DocumentExtensionOrderByRelevanceFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  extensionId: 'extensionId'
};

exports.Prisma.FolderDocumentOrderByRelevanceFieldEnum = {
  id: 'id',
  folderId: 'folderId',
  documentExtensionId: 'documentExtensionId',
  url: 'url'
};


exports.Prisma.ModelName = {
  State: 'State',
  Municipality: 'Municipality',
  User: 'User',
  Student: 'Student',
  Withdrawal: 'Withdrawal',
  Role: 'Role',
  Administrator: 'Administrator',
  ActionHistory: 'ActionHistory',
  Pnf: 'Pnf',
  Trajectory: 'Trajectory',
  CurricularUnit: 'CurricularUnit',
  AcademicPeriod: 'AcademicPeriod',
  Section: 'Section',
  CoursePeriod: 'CoursePeriod',
  Enrollment: 'Enrollment',
  Attendance: 'Attendance',
  Grade: 'Grade',
  Request: 'Request',
  PaymentDetail: 'PaymentDetail',
  Payment: 'Payment',
  StudentRequest: 'StudentRequest',
  FilingCabinet: 'FilingCabinet',
  Level: 'Level',
  Folder: 'Folder',
  Document: 'Document',
  Extension: 'Extension',
  DocumentExtension: 'DocumentExtension',
  FolderDocument: 'FolderDocument'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
