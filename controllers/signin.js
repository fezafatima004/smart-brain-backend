const handleSignin = (req,res,db,bcrypt) => {
    const {password,email} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission');
    }

    db.select('email','hash').from('login2')
    .where('email','=',email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        console.log(isValid);
        if(isValid){
            return db.select('*').from('login')
            .where('email','=',email)
            .then(data => {
                res.json(data[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            res.status(400).json('wrong crendentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin : handleSignin
}