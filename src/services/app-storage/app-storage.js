
 export class AppStorage {
    constructor(storage) {
      this.storage = storage || window.localStorage;
  
      if (!this.isSupported()) {
        throw new Error('Storage is not supported by browser!');
      }
    }
  
    setItem(key, value) {
      let serializedValue = '';
      try {
        serializedValue = JSON.stringify(value);
        this.storage.setItem(key, serializedValue);
      } catch (err) {
        console.error(err);
      }
    }
  
    getItem(key) {
      const serializedValue = this.storage.getItem(key);
      try {
        const value = JSON.parse(serializedValue);
        return value;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  
    removeItem(key) {
      this.storage.removeItem(key);
    }
  
    clear() {
      this.storage.clear();
    }
  
    isStorageAvailable() {
      try {
        this.storage.setItem('test', 'test');
        this.storage.removeItem('test');
        return true;
      } catch (exception) {
        return false;
      }
    }
  
    isSupported() {
      if (!this.storage) { return false; }
  
      return this.isStorageAvailable();
    }
  }
  
  const appLocalStorage = new AppStorage();
  const appSessionStorage = new AppStorage(window.sessionStorage);
  
  export { appLocalStorage, appSessionStorage };
  