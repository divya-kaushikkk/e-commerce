export const adminAccess = async (req, res, next) => {
    try{
        console.log(req.user.role);
        if(req.user.role !== "admin"){
            return res.status(403).json({success: false, message: "Admin access only."});
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}