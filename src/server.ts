import {Configuration, GlobalAcceptMimesMiddleware, Inject, PlatformApplication} from '@tsed/common';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import {ArticleController} from './controllers/ArticleController';
import {PassportController} from './controllers/PassportController';
import {UserLoginCredentials} from './models/LoginCredentials';
import {config} from 'dotenv';
import {Env} from '@tsed/core';
import * as cors from 'cors';

const rootDir = __dirname;

config();

@Configuration({
    rootDir,
    port: 9000,
    env: Env.DEV,
    httpsPort: false,
    acceptMimes: ['application/json'],
    mongoose: [{
        id: 'default',
        url: 'mongodb://admin:admin@localhost:27017/test',
        connectionOptions: {}
    }],
    componentsScan: [
        `${rootDir}/protocols/**/*.ts`,
        `${rootDir}/middlewares/**/*.ts`
    ],
    mount: {
        '/api': [
            PassportController,
            ArticleController
        ]
    },
    swagger: {
        path: '/api-docs'
    },
    passport: {
        userInfoModel: UserLoginCredentials
    }
})
export class Server {
    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;


    originsWhitelist = [
        'http://localhost:4200',
    ];

    corsOptions = {
        origin: (origin, callback) => {
            const isWhitelisted = this.originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials: true
    };

    public $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(cors(this.corsOptions))
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json({limit: '50mb'}))
            .use(
                bodyParser.urlencoded({
                    extended: true,
                    limit: '50mb'
                })
            );
    }
}
