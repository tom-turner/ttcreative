const ObjectsToCsv = require('objects-to-csv');
const path = 'exports/dbexport-'

class CSV {
	async make(data) {
		let timestamp = Date.now().toString()
		const csv = new ObjectsToCsv(data);
		let filePath = path + timestamp +'.csv'
		await csv.toDisk( filePath.toString() )
		
		return filePath.toString()
	}
}

module.exports = CSV