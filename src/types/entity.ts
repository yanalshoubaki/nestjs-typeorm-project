export type TUser = {
  id: number;
  name: string;
  username: string;
  image?: string;
  email: string;
  lastLoginAt: Date;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
