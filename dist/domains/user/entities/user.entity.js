"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const base_entity_1 = require("../../../core/entity/base.entity");
const password_utils_1 = require("../../../utils/password.utils");
const typeorm_1 = require("typeorm");
const constants_1 = require("../../auth/helpers/constants");
let User = User_1 = class User extends base_entity_1.default {
    static from({ email, password, nickname, profilePath, isPremium, agreeWithMarketing, loginMethod, fbToken, }) {
        const user = new User_1();
        user.email = email;
        user.password = (0, password_utils_1.hashPassword)(password);
        user.nickname = nickname;
        user.profilePath = profilePath;
        user.isPremium = isPremium;
        user.agreeWithMarketing = agreeWithMarketing;
        user.loginMethod = loginMethod;
        user.fbToken = fbToken;
        return user;
    }
    static userProfile(idx, nickname, profilePath) {
        const user = new User_1();
        user.idx = idx;
        user.nickname = nickname;
        user.profilePath = profilePath;
        return user;
    }
    updateFromDto(dto) {
        this.email = dto.email;
        this.nickname = dto.nickname;
        this.profilePath = dto.profilePath;
    }
};
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 32,
    }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isPremium", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "agreeWithMarketing", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "loginMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "fbToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map