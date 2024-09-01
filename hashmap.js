function HashMap () {
    let buckets = [];
    let currLength = 0;
    const LOAD_FACTOR = 0.75;
    function doubleBucket () {
        currLength = 0;
        incrementLen()
        const oldLen = buckets.length;
        let old = entries()
        console.log(old)
        buckets = [];
        for (let n = 0; n < oldLen * 2; n++) buckets.push(Node());
        for (let node of old) set(node[0], node[1])
    }
    const incrementLen = () => currLength++;
    const decrementLen = () => currLength--;
    const initializeBuckets = () => { 
        for (let n = 0; n < 16; n++) buckets.push(Node());
    }
    initializeBuckets()
    function hash (key) {
        let hashCode = 0;

        const PRIME_NUMBER = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = PRIME_NUMBER * hashCode + key.charCodeAt(i);
            hashCode = hashCode % buckets.length;
        }

        return hashCode
    }
    function set (key, value) {
        const hashKey = hash(key);
        let oldNode = buckets[hashKey].next;
        while (oldNode) {
            if (oldNode.obj[key]) {
                oldNode.obj[key] = value;
                return
            }
            oldNode = oldNode.next
        }
        incrementLen();
        if (currLength > buckets.length * LOAD_FACTOR) doubleBucket();
        const obj = {}
        obj[key] = value;
        const node = Node(obj, buckets[hashKey].next);
        buckets[hashKey].next = node;
    }
    function entries () {
        let allEntries = [];
        for (let n of buckets) {
            let node = n.next;
            while (node) {
                allEntries.push([...Object.keys(node.obj), ...Object.values(node.obj)]);
                node = node.next
            }
        }
        return allEntries
    }
    return {
        getBuckets: () => buckets,
        set,
        entries,
        get: (key) => {
            const hashKey = hash(key);
            let node = buckets[hashKey].next;
            while (node) {
                if (node.obj[key] !== undefined) return node.obj[key]
                node = node.next
            }
            return null
        },
        has: (key) => {
            const hashKey = hash(key);
            let node = buckets[hashKey].next;
            while (node) {
                if (node.obj[key] !== undefined) return true
                node = node.next;
            }
            return false
        },
        remove: (key) => {
            const hashKey = hash(key);
            let node = buckets[hashKey];
            while (node.next) {
                if (node.next.obj[key]) {
                    node.next = node.next.next;
                    decrementLen();
                    return true
                }
                node = node.next;
            }
            return false
        },
        length: () => {
            return currLength
        },
        clear: () => {
            buckets = [];
            currLength = 0;
            initializeBuckets();
        },
        keys: () => {
            let allKeys = [];
            for (let n of buckets) {
                let node = n.next;
                while (node) {
                    allKeys.push(...Object.keys(node.obj));
                    node = node.next
                }
            }
            return allKeys
        },
        values: () => {
            let allValues = [];
            for (let n of buckets) {
                let node = n.next;
                while (node) {
                    allValues.push(...Object.values(node.obj));
                    node = node.next
                }
            }
            return allValues
        },
    }
}

function Node (obj, next) {
    return {
        obj, 
        next,
    }
}

const test = new HashMap()
test.set('apple', 'red')
test.set('apple', 'blue1')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')