# 1. 실습내용 
todolist의 기능을 `new`키워드와 `prototype`을 사용해 클래스로 만들어보자.
todolist에는 추가, 완료(삭제), 전체리스트 보기 기능이 있어야 된다.

```javascript
// TODO LIST
var todoExec = {
    addTask : function(taskItem){
        this.todoList.push(taskItem);
        debugger;
        msg = "새로운 할일"+taskItem+"가 등록되었습니다.";
        console.log(msg, this.todoList);
    },
    compeleteTask : function(taskItem){
        var i = this.todoList.indexOf(taskItem);
        if(i != -1) {
            this.todoList.splice(i, 1);
        }
        msg = "할일"+taskItem+"가 삭제되었습니다.";
        console.log(msg, this.todoList);
    },

    showTask : function(){
        msg = "전체 할일은"+this.todoList+"입니다";
        console.log(msg, this.todoList);
    }
}

function newTask(todoList){
    this.todoList = [];
}

newTask.prototype = todoExec;
var TodayTask = new newTask();

//execute
TodayTask.addTask("빨래하기");
TodayTask.compeleteTask("빨래하기");
```


# 2. 숙제 
## `Closures`