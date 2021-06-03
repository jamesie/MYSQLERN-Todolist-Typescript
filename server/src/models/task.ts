import { Entity, Column, ManyToOne } from "typeorm";
import { TodoList } from "./todolist";
import { BaseEntity } from "./base";
import { User } from "./user";

@Entity()
export class Task extends BaseEntity {
  @Column({ type: String })
  taskName!: string;

  @Column({ default: false })
  status!: boolean;

  @Column({ nullable: true })
  toBeCompletedBy!: Date;

  @ManyToOne(() => TodoList, (todoList) => todoList.tasks)
  todoList!: TodoList;

  @Column()
  todoListId!: number;

  @ManyToOne(() => User, (user) => user.todoLists)
  creator!: User;

  @Column()
  creatorId!: number;
}
