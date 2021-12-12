const fs = require('fs')


class DB {
  constructor(dbFilePath) {
    this.filePath = dbFilePath
    this.connect(this.filePath)
    this.file = this.readFile(this.filePath)
  }

  connect(filePath){
    if(fs.existsSync(filePath)){
      console.log('connected to database')
    } else {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2 ))
      console.log('database created')
      this.connect(filePath)
    }
  }

  readFile(filePath){
    try {
      let data = fs.readFileSync(filePath || this.filePath, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      console.log(err)
      return err
    }
  }

  writeFile(data, filePath){

  }

  get(session, filePath){
    return this.file.find((obj) => obj.session == session)
  }

  set(session, data, filePath){
    let sessionData = this.get(session)
    if(!sessionData){
      this.file.push(data)
    } else {
      for (let [key, value] of Object.entries(data)){
        sessionData[key] = value
      }
      this.file.forEach((obj, index) => {
        if(obj.session === sessionData.session) {
          this.file[index] = sessionData
        }
      })
    }
    fs.writeFileSync(this.filePath, JSON.stringify(this.file))
  }

  hash(input){
    let str = JSON.stringify(input)
    let hash = ''
    for (let i = 0; i < str.split('').length; i++) {
      let char = str.slice(i,i+1)
      hash = Number(char.charCodeAt(0)) + Number(hash) * i
    }
    return hash.toString().slice(-6)
  }


}

module.exports = DB
