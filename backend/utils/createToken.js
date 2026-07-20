import jwt from 'jsonwebtoken'

const setToken = (_id, res) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'})
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: !process.env.NODE_ENV == 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default setToken;