export const BrowserApis = ["sayHello"];
export interface IBrowserApi {
  locale: string;

  sayHello: () => Promise<null>;
}
