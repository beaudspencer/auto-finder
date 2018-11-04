require('dotenv/config')

const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const Algorithmia = require('algorithmia')
const uuidv4 = require('uuid/v4')
const craigslist = require('node-craigslist')
const request = require('request-promise-native')

const albumBucketName = process.env.BUCKET
const bucketRegion = process.env.REGION
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

AWS.config.update({
  region: bucketRegion,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  }
})

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: albumBucketName,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, uuidv4())
    }
  })
})

const client = new craigslist.Client({
  city: 'orangecounty'
})

const app = express()

app.use(express.static('public'))

app.get('/listings', (req, res) => {
  const {latlng, search} = req.query
  let postal
  request({
    uri: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=postal_code&key=${GOOGLE_API_KEY}`,
    method: 'get'
  })
    .then(response => {
      postal = (JSON.parse(response.body).results[0].address_components[0].long_name)
    })
    .then(
      client.search({
        category: 'cta',
        postal: postal,
        searchDistance: 40
      }, search)
        .then(listings => {
          res.json(listings)
        })
        .catch(err => {
          res.sendStatus(500).jsonp({error: err})
          console.error(err)
        })
    )
})

app.get('/details', (req, res) => {
  const {url} = req.query
  client.details(url)
    .then(details => {
      res.json(details)
    })
    .catch(err => {
      res.sendStatus(500)
      console.error(err)
    })
})

app.post('/', upload.single('image'), (req, res, next) => {
  Algorithmia.client(process.env.ALGORITHMIA_KEY)
    .algo(process.env.ALGORITHM)
    .pipe(req.file.location)
    .then(response => {
      const firstResponse = response.get()[0]
      const car = Object.assign({}, firstResponse, {imageURL: req.file.location})
      res.json(car)
    })
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
