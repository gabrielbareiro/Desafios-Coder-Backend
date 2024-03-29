function propsUsers(req, res, next) {
  const { name, photo, email } = req.body;
  if (!name || !photo || !email) {
    const error = new Error("All fields are required");
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsUsers;
