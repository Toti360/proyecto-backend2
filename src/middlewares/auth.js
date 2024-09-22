export function Admin(req, res, next) {
    if(req.user.role === "admin") {
        next(); 
    } else {
        res.status(403).send("Ups.!! Aquí sólo si eres Admin"); 
    }
}


export function User(req, res, next) {
    if(req.user.role === "usuario") {
        next(); 
    } else {
        res.status(403).send("Ups.!! Aquí sólo los Usuarios");
    }

}
