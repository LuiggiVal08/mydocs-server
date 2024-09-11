process.loadEnvFile()

module.exports = {
  username: 'root',
  password: '',
  database: 'MyDocs',
  dialect: process.env.NODE_ENV === 'production' ? 'mysql' : 'sqlite',
  storage: 'src/database/app.sqlite',
  define: {
    timestamps: true
  }
}
