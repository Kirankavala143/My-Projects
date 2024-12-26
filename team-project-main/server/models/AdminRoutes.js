import express from "express";  
import { deletUser, Getuser } from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verfiyToken.js";


const AdminRoutes=express.Router()

    AdminRoutes.get('/getuser',Getuser)
    AdminRoutes.post('/delet/:id',isAdmin,deletUser)



export  default AdminRoutes
