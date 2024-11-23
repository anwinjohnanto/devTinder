const adminAuth = (req, res, next) => {
    console.log("admin auth middleware");
    const token = 'xyz';
    if(token==='xyz'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}
const userAuth = (req, res, next) => {
    console.log("user auth middleware");
    
    const token = 'xyz';
    if(token==='xyz'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}

export {adminAuth, userAuth};