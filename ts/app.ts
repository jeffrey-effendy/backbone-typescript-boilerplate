/// <reference path='../typings/index.d.ts' />

/**
 * @file Contains the application view
 */

class AppView extends Backbone.View<Backbone.Model> {
  private template;

  constructor() {
    super();
    this.template = _.template($('#app-template').html());
  }

  public render() {
    this.$el.html(this.template());
    return this;
  }
}

class Router extends Backbone.Router {
  private appView: AppView;
  private rootEl: JQuery;

  constructor() {
    super({ routes: { '': 'homeRoute' } });
    this.appView = new AppView();
    this.rootEl = $('#app-content');
  }

  private renderView(view: Backbone.View<Backbone.Model>) {
    this.rootEl.html(view.render().el);
  }

  private homeRoute() {
    this.renderView(this.appView);
  }
}

new Router();
Backbone.history.start();
