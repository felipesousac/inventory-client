const TOKEN = "token";

export class TokenStore {
  static setToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }

  static logout() {
    sessionStorage.removeItem(TOKEN);
  }

  static get getToken() {
    return sessionStorage.getItem(TOKEN);
  }
}
