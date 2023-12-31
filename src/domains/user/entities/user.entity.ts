import { UpdateUserDto } from './../dtos/update-user.dto';
import BaseEntity from 'src/core/entity/base.entity';
import { hashPassword } from 'src/utils/password.utils';
import { Column, Entity, OneToMany } from 'typeorm';
import { SocialMethodType } from 'src/domains/auth/helpers/constants';
import { BoardAuction } from 'src/domains/auction_chat/entities/board-auction.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: false,
    length: 64,
  })
  email: string;

  @Column({
    nullable: false,
    length: 64,
  })
  password: string;

  @Column({
    nullable: false,
    length: 32,
  })
  nickname: string;

  @Column({
    nullable: true,
    default: null,
  })
  profilePath: string;

  @Column({
    nullable: true,
    default: 0,
  })
  isPremium: boolean;

  @Column({
    nullable: true,
    default: 0,
  })
  agreeWithMarketing: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  loginMethod: SocialMethodType;

  @Column({
    nullable: true,
    default: null,
  })
  fbToken: string;

  @Column({
    nullable: true,
    default: null,
  })
  refreshToken: string;

  // @OneToMany(() => BoardAuction, (schedule) => schedule.user)
  // schedules: BoardAuction[];

  static from({
    email,
    password,
    nickname,
    profilePath,
    isPremium,
    agreeWithMarketing,
    loginMethod,
    fbToken,
  }: {
    email: string;
    password: string;
    nickname: string;
    profilePath: string;
    isPremium: boolean;
    agreeWithMarketing: boolean;
    loginMethod: SocialMethodType;
    fbToken: string;
  }) {
    const user = new User();
    user.email = email;
    user.password = hashPassword(password);
    user.nickname = nickname;
    user.profilePath = profilePath;
    user.isPremium = isPremium;
    user.agreeWithMarketing = agreeWithMarketing;
    user.loginMethod = loginMethod;
    user.fbToken = fbToken;
    return user;
  }
  static userProfile(idx, nickname, profilePath) {
    const user = new User();
    user.idx = idx;
    user.nickname = nickname;
    user.profilePath = profilePath;
    return user;
  }

  updateFromDto(dto: UpdateUserDto) {
    this.email = dto.email;
    this.nickname = dto.nickname;
    this.profilePath = dto.profilePath;
  }
}
