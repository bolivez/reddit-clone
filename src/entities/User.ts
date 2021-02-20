import { IsEmail, Length } from "class-validator"
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm"
import bcrypt from "bcrypt"
import { Exclude, Expose } from "class-transformer"

import Entity from "./Entity"
import Post from "./Post"
import Vote from "./Vote"
import Sub from "./Sub"

@TOEntity("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }

  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(1, 255, { message: "Email is empty" })
  @Column({ unique: true })
  email: string

  @Index()
  @Length(3, 255, { message: "Must be at least 3 characters long" })
  @Column({ unique: true })
  username: string

  @Exclude()
  @Column()
  @Length(6, 255, { message: "Must be at least 6 characters long" })
  password: string

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6)
  }

  //@OneToMany(() => Sub, (joinedSubs) => joinedSubs.members)
  //joinedSubs: Sub

  @OneToMany(() => Sub, (sub) => sub.members)
  joinedSubs: Sub[]

  //@JoinColumn({ name: "joinedSubs", referencedColumnName: "name" })

  /*
  @Column()
  isMember: boolean
  */
}
