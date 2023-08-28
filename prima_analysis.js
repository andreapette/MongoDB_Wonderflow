const productIds = db.products.distinct("_id", { scopes:  /^prima_insurance\./gi })

const reviews = db.reviews.find({ productIds: { $in: productIds}  })

const res = db.reviews.aggregate([{
  $match: {
    productIds: { $in: productIds}
  }
}, {
  $group:{
    _id: null,
    numberOfDocuments: {$sum: 1},
    numberOfWords: { $sum: "$numberOfWords" },
    maxNumberOfWords: {$max: "$numberOfWords" },
    avgNumberOfWords: {$avg: "$numberOfWords"  }
  }
}])

printjson(res.toArray())
