// In this file you can configure migrate-mongo
import config from 'config';

const migrationConfig = {
    mongodb: {
        url: config.get('mongo').url,
        databaseName: config.get('mongo').dbName,
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog",
    migrationFileExtension: ".js",
    useFileHash: false,
    moduleSystem: 'esm',
};

export default migrationConfig;