
export class Base64Encoder {

  public static Encode(str: string) {
    return btoa(str);
  }

  public static Decode(base64String: string) {
    return atob(base64String);
  }

}
