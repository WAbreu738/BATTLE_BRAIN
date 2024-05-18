const router = require('express').Router()

router.get('/', (req, res) => {
  try{
    res.render('home') 
    
  }catch (err) {
    console.log(err)
  }
})

router.get('/category', (req, res) => {
  try {
    res.render('category')

  } catch (err) {
    console.log(err)
  }  
})

router.get('/lobby', (req, res) => {
  try {
    res.render('lobby')
    
  } catch (err) {
    console.log(err)
  }
})

router.get('/game', (req, res) => {
  try {
    res.render('playscreen')
    
  } catch (error) {
    console.log(err)
  }  
})


module.exports = router