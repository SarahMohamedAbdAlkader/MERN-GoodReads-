
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
  
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { token00: iv.toString('hex'), token11: encrypted.toString('hex') };
   }

function decrypt(text) {
  
    
    let iv = Buffer.from(text.token00, 'hex');
    let encryptedText = Buffer.from(text.token11, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    
    return decrypted.toString();
   }

function editToken(userId, token){
    
    userId=userId.toString()
    token=token.toString()
    const res=userId.concat(token);
    const encryptedToken=encrypt(res)
    return encryptedToken;
   // return res;
}

function separateToken(encryptedToken){
      
    const token = decrypt(encryptedToken)    
    const id=token.substr(0,24);
    curtoken=token.substr(24,token.length)
    return {"id":id , "token":curtoken}
}

module.exports = {separateToken,editToken,decrypt};