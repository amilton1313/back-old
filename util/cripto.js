const bcrypt = require('bcryptjs')

const saltRounds = 10
const myString = 'Amilton'

// bcrypt.hash(myString, saltRounds, (err, hash) => {
//     if (!err) {
//         console.log(hash)
//     } else {
//         console.log(err)
//     }
// })

const myHash='$2a$10$jJlRoqgl9xy4cZTOja8qcOGyiSv3hgQEBJM.t6ONIG5l974s2RAyS'

bcrypt.compare('Amilto', myHash, (err, res) => {
    if (!err) {
        console.log('Senhas iguais : ', res)
    } else {
        console.log('Senhas iguais : ', err)
    }
})