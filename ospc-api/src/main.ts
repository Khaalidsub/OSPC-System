import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
// import * as Tracing from '@sentry/tracing';
import * as helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    environment: 'development',
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
  await app.listen(3000);
}
bootstrap();
