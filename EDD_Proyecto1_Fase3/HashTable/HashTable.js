export { HashTable };

class HashTable {
    constructor(size) {
      this.size = size;
      this.table = new Array(size);
      this.count = 0; // Tracks the number of key-value pairs stored
    }
  
    _hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % this.size;
    }
  
    set(key, value) {
      const index = this._hash(key);
      if (!this.table[index]) {
        this.table[index] = [];
      }
      const bucket = this.table[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value; // Update existing value if key already exists
          return;
        }
      }
      bucket.push([key, value]);
      this.count++;
  
      // Check load factor and perform rehashing if necessary
      if (this.count / this.size > 0.75) {
        this.rehash();
      }
    }
  
    get(key) {
      const index = this._hash(key);
      const bucket = this.table[index];
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i][0] === key) {
            return bucket[i][1];
          }
        }
      }
      return undefined;
    }
  
    remove(key) {
      const index = this._hash(key);
      const bucket = this.table[index];
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i][0] === key) {
            bucket.splice(i, 1);
            this.count--;
            return true;
          }
        }
      }
      return false;
    }
    
    // Returns the next prime number after `num`
    getNextPrime(num) {
        while (!this.isPrime(++num)) {}
        return num;
      }
    
      // Returns true if `num` is prime
      isPrime(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
          if (num % i === 0) return false;
        }
        return num > 1;
      }

    rehash() {
      const newSize = this.getNextPrime(this.size);
      const newTable = new Array(newSize);
  
      for (let i = 0; i < this.table.length; i++) {
        const bucket = this.table[i];
        if (bucket) {
          for (let j = 0; j < bucket.length; j++) {
            const [key, value] = bucket[j];
            const newIndex = this._hash(key);
            if (!newTable[newIndex]) {
              newTable[newIndex] = [];
            }
            newTable[newIndex].push([key, value]);
          }
        }
      }
  
      this.table = newTable;
      this.size = newSize;
    }
  
    keys() {
      const keysArray = [];
      for (let i = 0; i < this.table.length; i++) {
        const bucket = this.table[i];
        if (bucket) {
          for (let j = 0; j < bucket.length; j++) {
            keysArray.push(bucket[j][0]);
          }
        }
      }
      return keysArray;
    }
  }

//   // Create a new hash table with a size of 5
// const myHashTable = new HashTable(5);

// // Set key-value pairs
// myHashTable.set('name', 'John');
// myHashTable.set('age', 30);
// myHashTable.set('city', 'New York');

// // Get values
// console.log(myHashTable.get('name')); // Output: John
// console.log(myHashTable.get('age')); // Output: 30
// console.log(myHashTable.get('city')); // Output: New York

// // Remove a key-value pair
// myHashTable.remove('age');

// // Get keys
// console.log(myHashTable.keys()); // Output: ['name', 'city']

// // Add more key-value pairs to trigger rehashing
// myHashTable.set('country', 'USA');
// myHashTable.set('occupation', 'Engineer');
// myHashTable.set('language', 'JavaScript');
// myHashTable.set('hobby', 'Gardening');

// // Get keys after rehashing
// console.log(myHashTable.keys());
// // Output: ['name', 'city', 'country', 'occupation', 'language', 'hobby']