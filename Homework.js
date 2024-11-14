
// 1. Был нарушен принцип инверсии зависимостей. Исправленный код:

class Service {
    sendMessage(message) {
        throw new Error("ты используешь интерфейс!!!");
    }
}

class EmailService extends Service{
    sendMessage(message) {
        console.log(`Отправка email с сообщением: ${message}`);
    }
}

class Notification {
  constructor(service) {
      this.service = service;
  }
 
  notify(message) {
      this.service.sendMessage(message);
  }
}
 
 // Использование
const notification = new Notification(new EmailService); 
notification.notify("Важное сообщение");
 
 
 //2. Был нарушен принцип подстановки Барбары Лисков. Исправленный код: 

class Bird {
    fly() {
        console.log("Птица летит");
    }
    action() {
        this.fly();
    }
}

class Duck extends Bird {}
class Penguin extends Bird {

    action() {
        this.swim();
    }
    swim() {
        console.log("Птица плавает")
    }
    fly() {
        throw new Error("Пингвины не умеют летать");
    }

}
 // Использование
const birds = [new Duck(), new Penguin()];
birds.forEach(bird => bird.action());
 

 // 3. Был нарушен принцип единственной ответственности. Исправленный код:

class Database {
  save(user) {
      console.log(`Сохранение пользователя ${user.getName()} в базу данных`);
  }
}
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
 
    getName() {
        return this.name;
    }
}

 // Использование

const user = new User("Алексей", 30);
const database = new Database;
database.save(user);
