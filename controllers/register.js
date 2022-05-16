const handleRegister = (req,res,db,bcrypt) => {

    const {name,password,email} = req.body;
    if(!email || !password || !name){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login2')
            .returning('email')
            .then(email => {
                return trx('login')
                    .returning('*')
                    .insert({
                        email: email[0].email,
                        name: name,
                        joined: new Date()
        
                    })
                    .then(login => {
                        res.json(login[0]);
                    })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })

        .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister : handleRegister
}