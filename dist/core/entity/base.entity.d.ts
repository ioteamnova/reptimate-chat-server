import { BaseEntity as BaseTypeormEntity } from 'typeorm';
export default abstract class BaseEntity extends BaseTypeormEntity {
    idx: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
