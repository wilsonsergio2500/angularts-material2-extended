
export namespace Helpers{


  export const CopyObjectWithoutKey = (object, key) => {
    const { [key]: deletedKey, ...otherKeys } = object;
    return otherKeys;
  }
}