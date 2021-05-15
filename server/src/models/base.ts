import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export interface IBaseEntity {
  /**
   * @isInt
   */
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}