import {
  Field,
  ID,
  InputType,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';

export enum Role {
  student = 'STUDENT',
  coach = 'COACH',
  admin = 'ADMIN',
  moderator = 'MODERATOR',
}
export enum Status {
  active = 'ACTIVE',
  pending = 'PENDING',
  inactive = 'INACTIVE',
}

// export interface IUser {
//   id?: string;
//   name: string;
//   password?: string;
//   email: string;
//   phoneNumber: string;
//   universityId: string;
//   university: string;
//   role?: Role;
//   accountStatus?: Status;
//   coachingStatus?: Status;
//   moderatorStatus?: Status;
// }
@InterfaceType()
@InputType('userType')
export abstract class IUser {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  phoneNumber: string;
  @Field(() => String)
  universityId: string;
  @Field(() => String)
  university: string;
  @Field(() => Role, { nullable: true, defaultValue: Role.student })
  role?: Role;
  @Field(() => Status, { nullable: true, defaultValue: Status.pending })
  accountStatus?: Status;
  @Field(() => Status, { nullable: true, defaultValue: Status.inactive })
  coachingStatus?: Status;
  @Field(() => Status)
  moderatorStatus?: Status;
}

registerEnumType(Role, { name: 'Role' });
registerEnumType(Status, { name: 'Status' });
registerEnumType(Status, { name: 'CoachingStatus' });
