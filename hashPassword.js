// hashPassword.js
const bcrypt = require('bcryptjs');

const password = 'password';

bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Şifre haslenirken bir hata oluştu:', err);
    } else {
        console.log('Şifre başarıyla hashlendi:', hashedPassword);
    }
});
