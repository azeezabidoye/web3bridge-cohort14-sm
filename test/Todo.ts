import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Todo", function () {
  async function deployTodo() {
    const todo = await ethers.deployContract("Todo");
    return { todo };
  }

  it("Should get all tasks with getAllTasks()", async function () {
    const { todo } = await deployTodo();
    expect((await todo.getAllTasks()).length).to.equal(0);
  });

  it("Should create new tasks with createTask()", async function () {
    const { todo } = await deployTodo();
    const [newTask1, newTask2] = ["Do some Laundry", "Write some Code"];

    await Promise.all([todo.createTask(newTask1), todo.createTask(newTask2)]);

    const tasks = await todo.getAllTasks();
    console.log(tasks);

    const [title0, title1, length] = [
      tasks[0].title,
      tasks[1].title,
      tasks.length,
    ];
    expect(title0).to.equal(newTask1);
    expect(title1).to.equal(newTask2);
    expect(length).to.equal(2);
  });

  it("Should mark a task as completed with markComplete()", async function () {
    const { todo } = await deployTodo();
    const taskId = 1;

    await todo.createTask("Do some Laundry");
    const tasksBefore = await todo.getAllTasks();
    console.log(tasksBefore);

    expect(tasksBefore[0].title).to.equal("Do some Laundry");
    expect(tasksBefore[0].isComplete).to.equal(false);

    await todo.markComplete(taskId);

    const tasksAfter = await todo.getAllTasks();
    console.log(tasksAfter);
    expect(tasksAfter[0].isComplete).to.equal(true);
  });

  it("Should update a task's title with updateTask()", async function () {
    const { todo } = await deployTodo();
    const taskId = 1;

    await todo.createTask("Read Ethereum book");
    await todo.updateTask(taskId, "Watch football");

    const tasks = await todo.getAllTasks();
    console.log(tasks);
    expect(tasks[0].title).to.equal("Watch football");
  });

  it("Should delete a task with deleteTask()", async function () {
    const { todo } = await deployTodo();
    const taskId = 1;

    await Promise.all([
      todo.createTask("Read newspaper"),
      todo.createTask("Trim the flowers"),
      todo.createTask("Skate in and out"),
    ]);

    const tasksBefore = await todo.getAllTasks();
    console.log(tasksBefore);

    await todo.deleteTask(taskId);

    const tasksAfter = await todo.getAllTasks();
    console.log(tasksAfter.length);
    console.log(tasksAfter);
    expect(tasksAfter.length).to.equal(2);
  });
});
