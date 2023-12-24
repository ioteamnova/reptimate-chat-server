"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_ex_decorator_1 = require("../../../core/decorators/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async existByEmail(email) {
        const existEmail = await this.exist({
            where: {
                email,
            },
        });
        return existEmail;
    }
    async existByNickname(nickname) {
        const existNickname = await this.exist({
            where: {
                nickname,
            },
        });
        return existNickname;
    }
    async findByUserIdx(userIdx) {
        const user = await this.findOne({
            where: {
                idx: userIdx,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await this.findOne({
            where: {
                email: email,
            },
        });
        return user;
    }
    async updateFirebaseTokenByUserIdx(userIdx, fbToken) {
        await this.update({ idx: userIdx }, { fbToken: fbToken });
    }
    async updatePasswordByUserIdx(userIdx, newPassword) {
        await this.update({ idx: userIdx }, { password: newPassword });
    }
    async findByEmailAndLoginMethod(email, socialType) {
        return await this.findOne({
            where: {
                email: email,
                loginMethod: socialType,
            },
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map