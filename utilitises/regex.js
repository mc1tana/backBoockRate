const regemail =new RegExp (/([-_A-Za-z]){2,20}[@]{1}[A-Za-z]{2,5}[.][A-Za-z]{2,5}/);/*^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$*/ 
const regpassword= new RegExp(/[-/*+_0-9a-zA-Z]{2,15}/);/*^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$*/
const word = new RegExp(/^[A-Za-z0-9]+([,;:_\s]{1}[A-Za-z0-9]+)*[!.?]?$/)
const rate= new RegExp(/^[0-5]?$/)
const year= new RegExp(/^(-)?([0-9]){1,4}$/)
const userId= new RegExp(/[a-zA-Z0-9]+/)
const img= new RegExp(/[+*'\]\[@-_\\\/a-zA-Z0-9\s]+/) /* ^[^<>]*$ ^(?!.*\bchat\b).*$ */ /*interdiction element <>  interdiction de chat*/
const tabReg={
    email:regemail,
    password:regpassword,
    userId:userId,
    title:word,
    author:word,
    year:year,
    genre:word,
    grade:rate,
    rating:rate,
    averageRating:rate,
    imageUrl:img
}

module.exports=tabReg;
// var currentTime = new Date();
// var year = currentTime.getFullYear()