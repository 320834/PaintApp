class SocketInstance {
  constructor(socketID) {
    this.socketID = socketID;
    this.x = [];
    this.y = [];
  }

  /**
   * Coordinates to push
   */
  push(x, y) {
    this.x.push(x);
    this.y.push(y);
  }

  clear() {
    this.x = [];
    this.y = [];
  }
}

const set = new Set();

set.add("asef");
set.add(2);
set.add(3);

var a = set.values();

for (let value of a) {
  console.log(value);
  if (value == "stuff") {
  }
}
// while (a.next().value != null) {
//   console.log(a.next().value);
// }
