import express, { Application } from 'express'
import morgan from 'morgan'
// Routes
import { indexRoute } from './apis/index.route'
import session from 'express-session'
import { createClient,  RedisClientType } from 'redis'
import RedisStore from 'connect-redis'
import {signUpRoute} from "./apis/signup/sign-up.route";

import {logRoute} from "./apis/log/log.route";

import {trackerRoute} from "./apis/tracker/tracker.route";
import {journalRoute} from "./apis/journal/journal.route";
import {signInRoute} from "./apis/sign-in/sign-in.route";
import { profileRoute } from './apis/profile/profile.route'
import {signOutRoute} from "./apis/sign-out/sign-out.route";


// The following class creates the app and instantiates the server
export class App {
    app: Application
    redisClient: RedisClientType
    redisStore : RedisStore

    constructor (
        private readonly port?: number | string
    ) {

        this.redisClient = createClient({ socket: { host: process.env.REDIS_HOST } })
        this.redisClient.connect().catch(console.error)

        this.redisStore = new RedisStore({client: this.redisClient})
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    // private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
    public settings (): void {
        this.app.set('port', this.port)
    }

    // private method to setting up the middleware to handle json responses, one for dev and one for prod
    private middlewares (): void {

        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(session( {
            store: this.redisStore,
            proxy: true,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET as string,
            resave: false,
            cookie: {
                sameSite: "lax",
            }

        }))
    }

    // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
    private routes (): void {
        this.app.use(indexRoute.basePath, indexRoute.router)
        this.app.use(signUpRoute.basePath, signUpRoute.router)

        this.app.use(logRoute.basePath, logRoute.router)
        this.app.use(trackerRoute.basePath, trackerRoute.router)
        this.app.use(journalRoute.basePath, journalRoute.router)
        this.app.use(signInRoute.basePath, signInRoute.router)
        this.app.use(profileRoute.basePath, profileRoute.router)
        this.app.use(signOutRoute.basePath, signOutRoute.router)

    }

    // starts the server and tells the terminal to post a message that the server is running and on what port
    public async listen (): Promise<void> {
        await this.app.listen(this.app.get('port'))
        console.log('Express application built successfully')
    }
}