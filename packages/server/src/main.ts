import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { config } from 'dotenv';
// import * as Tracing from '@sentry/tracing';
import * as helmet from 'helmet';

import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  if (process.env.NODE_ENV !=='production') {
     
    console.log('helli it is being dispatched');
    config({debug:true});
      
    }
  const app = await NestFactory.create(AppModule);

  
  Sentry.init({
    environment: process.env.NODE_ENV,
    dsn:
      'https://22d588d25f6e403ab2070c38abe3b644@o334664.ingest.sentry.io/5636077',
    integrations: [
      new Sentry.Integrations.Http({ tracing: false }),
      // new Tracing.Integrations.Express({
      //   // to trace all requests to the default router
      //   // alternatively, you can specify the routes you want to trace:
      //   // router: someRouter,
      // }),
    ],

    tracesSampleRate: 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  // app.use(helmet());
  app.use(Sentry.Handlers.errorHandler());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // credentials: true,
    origin:'*'
    // origin: `http://${process.env.CLIENT || 'localhost'}:3000`,
  });
  await app.listen(process.env.PORT || 3001);
  if (module.hot) {

    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
