"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveRoomRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_ex_decorator_1 = require("../../../core/decorators/typeorm-ex.decorator");
const live_room_entity_1 = require("../entities/live_room.entity");
let LiveRoomRepository = class LiveRoomRepository extends typeorm_1.Repository {
};
LiveRoomRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(live_room_entity_1.LiveRoom)
], LiveRoomRepository);
exports.LiveRoomRepository = LiveRoomRepository;
//# sourceMappingURL=live_room.repository.js.map