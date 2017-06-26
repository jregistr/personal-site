declare function isNaN(value: string): boolean

interface JQuery {
  modal(param: string): void;

}

interface JQueryStatic {
  ajax(param: any): JQuery.jqXHR;
}

interface Controller {
  MailController: {
    index: (...params) => any
  }
}

declare namespace jsRoutes {
  let controllers: Controller;
}
