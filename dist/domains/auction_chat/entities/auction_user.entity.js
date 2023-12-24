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
var AuctionUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionUser = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../core/entity/base.entity");
const typeorm_1 = require("typeorm");
let AuctionUser = AuctionUser_1 = class AuctionUser extends base_entity_1.default {
    static from(auctionIdx, userIdx) {
        const auctionUser = new AuctionUser_1();
        auctionUser.auctionIdx = auctionIdx;
        auctionUser.userIdx = userIdx;
        return auctionUser;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '경매게시글 번호',
        default: '465',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuctionUser.prototype, "auctionIdx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디',
        default: '65',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuctionUser.prototype, "userIdx", void 0);
AuctionUser = AuctionUser_1 = __decorate([
    (0, typeorm_1.Entity)()
], AuctionUser);
exports.AuctionUser = AuctionUser;
//# sourceMappingURL=auction_user.entity.js.map