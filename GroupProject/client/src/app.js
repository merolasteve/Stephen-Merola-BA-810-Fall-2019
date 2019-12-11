import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.title = 'Sign-up';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'modules/home',
        title: 'Home',
        auth:false
      },
      {
        route: 'users',
        name: 'users',
        moduleId: 'modules/users',
        title: 'Users',
        auth:false
      },
      {
        route: 'todos',
        name: 'todos',
        moduleId: 'modules/todos',
        title: 'Office Party',
        auth:true
      }
    ]);
  }
}
