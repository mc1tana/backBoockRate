const tabReg= require('../utilitises/regex')
module.exports = (req, res, next) => {
	try{       
        // console.log({1:req.body})
        req.body=req.file ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } :{ ...req.body };
        // console.log('req body  on checkAuth')
        // console.log({2:req.body})
        for(let e in req.body){
             let eltTest= req.body[e];
            // console.log(e)
            //  console.log(isNaN( req.body[e]))
             console.log(( {15:req.body[e]}))
            
            if(typeof(req.body[e])=="string" && isNaN(req.body[e]) ){
                console.log('not parse')
                eltTest=req.body[e].trim() ?? undefined;
            }
            else if(req.body[e] && req.body[e]!=''){
                console.log('parse')
               eltTest=parseFloat(req.body[e])?? undefined
            }
            // console.log(e)
            // console.log(eltTest)
            // console.log(tabReg[e])
            // console.log(tabReg[e].exec(eltTest))
            if(tabReg[e].exec(eltTest)){
                // console.log('test')
                req.body[e]=eltTest
            }else{
                return res.status(400).json({message:(e+" : Not Good Format")})
            } 
        }
        console.log('checked ok')
            next()
	}catch(e){
		return res.status(500).json({error: new Error("Something wrong occured")})
	}

}