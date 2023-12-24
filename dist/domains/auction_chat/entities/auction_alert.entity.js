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
var AuctionAlert_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionAlert = void 0;
const base_entity_1 = require("../../../core/entity/base.entity");
const typeorm_1 = require("typeorm");
let AuctionAlert = AuctionAlert_1 = class AuctionAlert extends base_entity_1.default {
    static from(auctionIdx, userIdx) {
        const auctionAlert = new AuctionAlert_1();
        auctionAlert.auctionIdx = auctionIdx;
        auctionAlert.userIdx = userIdx;
        return auctionAlert;
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuctionAlert.prototype, "auctionIdx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuctionAlert.prototype, "userIdx", void 0);
AuctionAlert = AuctionAlert_1 = __decorate([
    (0, typeorm_1.Entity)()
], AuctionAlert);
exports.AuctionAlert = AuctionAlert;
//# sourceMappingURL=auction_alert.entity.js.map