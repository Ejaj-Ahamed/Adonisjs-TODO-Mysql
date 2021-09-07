yarn add @adonisjs/lucid@alpha
node ace invoke @adonisjs/lucid
yarn add mysql
yarn add objection
const { knexSnakeCaseMappers } = require("objection");
mysql: ({
      ...{
     client: 'mysql',
     connection: {
       host: Env.get('MYSQL_HOST'),
       port: Env.get('MYSQL_PORT'),
       user: Env.get('MYSQL_USER'),
       password: Env.get('MYSQL_PASSWORD', ''),
       database: Env.get('MYSQL_DB_NAME'),
     },
     healthCheck: false,
     debug: false,
   },
   ...knexSnakeCaseMappers()
  })
node ace make:migration tasks
node ace migration:run
node ace make:model Task
yarn add @adonisjs/shield@alpha => csrf
node ace invoke @adonisjs/shield
node ace make:controller Tasks
allowMethodSpoofing: true,
node ace migration:rollback