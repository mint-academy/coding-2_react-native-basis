/*
  Hilfsfunktionen:
  - move: 
    Verschiebt die Aufgabe in der Liste

  - findTodo:
    Sucht nach dem Titel einer Aufgabe
  
  Die Hilfsfunktionen werden direkt exportiert.
*/
module.exports = {
  move: function(array, fromIndex, toIndex) {
    return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  },

  findTodo: function(todo, todoList) {
    return todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase());
  }
};
