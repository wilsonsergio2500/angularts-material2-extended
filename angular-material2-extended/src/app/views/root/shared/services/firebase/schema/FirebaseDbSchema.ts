
export interface IUserImageBase {
  value: string;
}
export interface IUserConnectionBaseEntity {
  userId: string;
}

export type FireBaseSocialTypes = "App" | "Facebook";
export type FireBaseSocialTypesMap = {[types in FireBaseSocialTypes]: IUserImageBase}
export type ConnectionsType = "Following" | "Followers";
export type ConnectionsTypeMap = {[types in ConnectionsType]: IUserConnectionBaseEntity}



export interface IUserEntity {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  memberSince: number;
  image: FireBaseSocialTypesMap;
  friendlyUrlId: string;

}


export interface IFriendlyUrlEntity {
  [FriendlyUrl: string]: IUserConnectionBaseEntity;
}

export interface DBSchema {
  users: {
    [userId: string]: IUserEntity;
  }
}
