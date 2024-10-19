

async function jwtToken(user, statuscode, res) {

    const token = await user.getjsonwebtoken();


    const options = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statuscode).cookie("token", token, options).json({
        token,
        user
    })

}
module.exports = jwtToken;

