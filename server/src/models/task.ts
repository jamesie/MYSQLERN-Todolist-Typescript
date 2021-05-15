import { Entity, Column, ManyToOne} from "typeorm";
import { TodoList } from './todolist';
import { BaseEntity } from "./base";

@Entity()
export class Task extends BaseEntity {

  @Column({ type: String })
  taskName!: string;

  @Column({default: false})
  status!: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.tasks)
  belongsTo!: TodoList;
}
