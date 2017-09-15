module.exports = (req, res, next) => {
  if (typeof (req.user) !== "undefined") {
    res.locals.userSignedIn = true
  } else {
    res.locals.userSignedIn = false
  }
  next()
}
