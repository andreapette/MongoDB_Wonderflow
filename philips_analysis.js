const productIds = db.products.distinct("_id", { scopes: {$in: [/^nlp.philips_lb\./gi, /^Philips_ph_contract\./gi]}})

const reviews = db.reviews.find({ productIds: { $in: productIds}  })

const res = db.reviews.aggregate([{
  $match: {
    productIds: { $in: productIds}
  }
}, {
  $group:{
    _id: null,
    numberOfDocuments: {$sum: 1},
    numberOfDocumentsAbove384: {$sum: {$cond: {if: {$gt:["$numberOfWords", 384]}, then: 1, else: 0}}},
    numberOfWords: {$sum: "$numberOfWords" },
    maxNumberOfWords: {$max: "$numberOfWords" },
    avgNumberOfWords: {$avg: "$numberOfWords"  }
  }
}])

printjson(res.toArray())
