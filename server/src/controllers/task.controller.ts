import { Controller, Route, Tags } from "tsoa"

export interface ITodoListPayload {
  id: number
  name: string
}

@Route("task")
@Tags("Task")
export default class TodoListController extends Controller {


}