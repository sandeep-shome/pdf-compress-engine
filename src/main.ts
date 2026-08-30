import app from './app.js';

const bootstrap = (): void => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
};

bootstrap();
