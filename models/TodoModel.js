/*
  Model
  Das Modell enthält Daten, die von der Präsentation (View) dargestellt werden.
  TodoModel:
  - title (Titel der Aufgabe)
  - completed (Ist die Aufgabe erledigt)
  - createdAt (Datum, wann die Aufgabe erstellt wurde)
*/
class TodoModel {
  constructor(title, completed) {
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
  }
}

/*
  indirekte Methode des Exports
*/

module.exports = TodoModel;