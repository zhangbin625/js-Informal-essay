
class ProxyObservable {
  constructor() {
    //用于观察者存放数据的
    this.queueObservers = new Set();
    this.setName = this.setName.bind(this)
  }

  //绑定订阅者
  observe(func) {
    this.queueObservers.add(func);
  }

  /**
   * 观察者
   * */
  observable(obj) {
    return new Proxy(obj, {
      set: this.setName
    })
  }

  setName(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    this.queueObservers.forEach(obser => obser());
    return result
  }
}

const obs = new ProxyObservable();
const testData = obs.observable({
  name: '小彬彬',
  age: 24
});

const print2 = () => {
  console.log(`实现了没有`)
}
const print = () => {
  console.log(`${testData.name}已经${testData.age}了`)
}

obs.observe(print)
obs.observe(print2)
testData.name = '小美'