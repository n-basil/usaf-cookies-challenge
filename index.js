const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.get('/login', (req, res) => {
    let name = "Nick"
    var opts = {
        maxAge: 900000,
        httpOnly: true
    }
    res.cookie('userName', name, opts)
    res.send("You are at the login page")
})

app.use(cookieParser())

app.get('/hello', (req, res) => {
    if (req.cookies.userName === undefined) {
        res.send(`Please visit /login to login to the application`)
    }
    else {
        res.send(`Welcome ${req.cookies.userName}`)
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('userName')
    res.send("You have been logged out. \n Vist /login to log back in to the application")
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))