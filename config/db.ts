import mongoose from 'mongoose';
import config from 'config';

//Logger
import Logger from '../config/logger';

async function connect() {
    const dbUrl = config.get<string>('dbUrl');

    try {
        await mongoose.connect(dbUrl);
        Logger.info('Conectou ao banco de dados !');
    } catch (error) {
        Logger.info('Não foi possível conectar');
        Logger.info(`Error: ${error}`);
        process.exit(1);
    }
};

export default connect;