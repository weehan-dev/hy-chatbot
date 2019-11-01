import express from 'express';
import loader from './loaders';

class App {
  constructor(appLoader) {
    this.loader = appLoader;
    this.app = express();
  }

  init() {
    this.loader(this.app).then(() => {
      this.app.listen(this.app.get('port'), () => {
        console.log(`Server is on ${this.app.get('port')}`);
      });
    });
  }
}

const app = new App(loader);
app.init();
