const handleProfile = (req,res,db,bcrypt) => {
    const { id } = req.params;

    
    db.select('*').from('login').where({
        id: id
    })
    .then(user => {
        console.log(user)
        res.json(user)
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
    handleProfile : handleProfile
}