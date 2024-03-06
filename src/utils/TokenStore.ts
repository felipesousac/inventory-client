const TOKEN = "token";

export class TokenStore {
  static setToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }

  static get token() {
    return sessionStorage.getItem(TOKEN);
  }
}
