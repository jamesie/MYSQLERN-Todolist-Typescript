import { Entity, Column, OneToMany, JoinColumn} from "typeorm";
import { BaseEntity } from "./base";
import { TodoList } from './todolist';

@Entity()
export class User extends BaseEntity { 
  
  @Column({ type: String, unique: true })
  username!: string;

  @Column({ type: String })
  password!: string;

  @JoinColumn()
  @OneToMany(() => TodoList , (todolist) => todolist.creator)
  todoLists!: TodoList[];

}
