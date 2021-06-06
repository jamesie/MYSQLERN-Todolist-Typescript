import { Entity, Column, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "./base";
import { TodoList } from "./todolist";
import { Task } from "./task";

@Entity()
export class User extends BaseEntity {
  @Column({ type: String, unique: true })
  username!: string;

  @Column({ type: String })
  password!: string;

  @JoinColumn()
  @OneToMany(() => TodoList, (todolist) => todolist.creator, { onDelete: 'CASCADE' })
  todoLists!: TodoList[];

  @JoinColumn()
  @OneToMany(() => Task, (task) => task.creator, { onDelete: 'CASCADE' })
  tasks!: Task[];
}
