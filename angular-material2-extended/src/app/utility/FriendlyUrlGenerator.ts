
export class FriendlyUrlGenerator {

  public static  NewId() {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    const first = ("000" + firstPart.toString(36)).slice(-3);
    const second = ("000" + secondPart.toString(36)).slice(-3);
    return first + second;
  }
}
