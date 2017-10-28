## Repbase
A tool for storing data in GitHub.

### Feature

- run anywhere (server / front-end / application / electron...)
- easy. no configuration, no server
- free.

### Usage
1. install:
  ```bash
  npm i repbase --save
  ```
2. import:

```typescript
  const Repbase = require('repbase')

  // options see documentation
  const packer = new Repbase(options)

  // initialize data partition
  packer.init(['users', 'articles'])
  packer.users.save({ name: 'admin', pass: 'abc' })

  packer.users.findOne({ name: 'admin' })
  // output: { name: admin, pass: 'abc' }
```

### Documentation

- Options:

```typescript
  {
    // github repository url, required.
    repository: '',

    // enum: ['async', 'network'], default: network
    //async mode will be stored in the disk first, then run network task
    style: string,

    // enum: ['json', 'string', 'binary'], default: json
    dataType: string,

  }
```

- Action:
> Each action returns an promise object


```typescript
// object were inserted in the store
packer.users.insert({})

// find all documents in the store
packer.users.find()

// use the documents to match fields in store
packer.users.find({ name: 'witt' })

// just find one
packer.users.findOne({ name: 'witt' })

packer.users.update({ name: 'witt' }, { age: 20 })

packer.users.remove({ name: 'witt' })

// remove documents
packer.users.removeAll()

// count all documents in the store
packer.users.count()
```

- Synchronous data:
> If you use network mode (options: { style: network }), the data will be automatically synchronized, you can skip over here.

In async mode, you need to upload data manually.
include actions: insert, update
```typescript
// update users
packer.users.update({ name: 'witt' }, { age: 20 })

// ...the data will be saved to the local hard disk

// upload data, return promise object
packer.save()
.then(result => {})
.catch(err => {})

```

Notice:
- All the data is stored in GitHub, and they're all public.
- Most of the actions will initiate network requests.
- This project is suitable for students, individuals, or blogs, not suitable for professional or enterprise projects.
-


