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

  @Column()
  creatorId!: number;

  @OneToMany(() => Task, (task) => task.todoList)
  tasks!: Task[];

}
