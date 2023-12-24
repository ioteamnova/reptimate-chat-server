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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRequest = exports.Page = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class Page {
    constructor(totalCount, items, pageRequest) {
        this.pageSize = Number(pageRequest.size);
        this.totalCount = totalCount;
        this.totalPage = Math.ceil(totalCount / (pageRequest.size || 20));
        this.existsNextPage = this.totalPage > (pageRequest.page || 1);
        this.items = items;
    }
}
exports.Page = Page;
class PageRequest {
    constructor() {
        this.page = 1;
        this.size = 20;
    }
    get offset() {
        return ((this.page || 1) - 1) * (this.size || 20);
    }
    get limit() {
        return this.size || 20;
    }
    existsNextPage(totalCount) {
        const totalPage = totalCount / (this.size || 20);
        return totalPage > (this.page || 1);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '페이지 번호',
        nullable: true,
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PageRequest.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '페이지당 개수',
        nullable: true,
        required: false,
        default: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PageRequest.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '정렬',
        required: false,
        default: 'DESC',
        enum: ['DESC', 'ASC'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageRequest.prototype, "order", void 0);
exports.PageRequest = PageRequest;
//# sourceMappingURL=page.js.map