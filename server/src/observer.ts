import * as socketIo from 'socket.io';

interface Subject {
  attach(iobserver: Observer): void;
  detach(observer: Observer): void;
  notify(sender: string): void;
}

interface Observer {
  socket: socketIo.Socket;
  id: string;
}

class Observable implements Subject {

  public state: any;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.some(x => x.id === observer.id);
    if (isExist) {
      return;
    }

    this.observers.push(observer);
  }

  public notify(sender: string): void {
    for (const observer of this.observers) {
      if (observer.id !== sender) {
        observer.socket.emit('message', this.state);
      }
    }
  }
  public detach(observer: Observer): void {
    this.observers = this.observers.filter(x => x.id !== observer.id);
  }

  public update(sender: string, data: any): void {
    this.state = data;
    this.notify(sender);
  }
}

export default Observable;
