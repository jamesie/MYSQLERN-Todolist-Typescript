import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class TodoList extends BaseEntity {
  @Column({ type: String })
  todoListName!: string;

  @ManyToOne(() => User, (user) => user.todoLists)
  creator!: User;

  @OneToMany(() => Task, (task) => task.belongsTo)
  tasks!: Task[];
}
