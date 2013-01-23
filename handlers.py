import cyclone.web  
import json
from bson import ObjectId
from Backend.Data.InterfazDB.DBmodule import DBModule

class GetBodegasHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        result = []
        for i in range(24):
            x={"_id":str(ObjectId()),"name":"Bodega"+str(i+1),"status":"Valido","address": {"district":"Colonia","street":"Calle","intNum": None, "extNum": 100} ,"phone":str(9789560+i),"businessName":"Negocio"+str(i+1),"manager":{"_id":str(ObjectId()),"status":"Valido","username":"Manager"+str(i+1),"password":"pass","curp":"89687800"+str(i),"phone":"9781200","email":"manager"+str(i+1)+"@gmail.com","type":"mamanger"},"geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"maxSale":"1500","minSale":"0"}
            result.append(x)
        self.write({"result": result})
        self.finish()

class GetPuntosHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        result = []
        for i in range(24):
            x={"_id":str(ObjectId()),"status":"Valido","phone":str(9789560+i),"email":"punto"+str(i+1)+"@gmail.com","joinDate":"15enero2010","fridge":{"serial":"4747464"+str(i),"temperature":"-5","status":"Valido"},"representative":{"name":"representante"+str(i+1),"phone":str(9789560+i),"email":"representante"+str(i+1)+"@gmail.com"},"stock":{"name":"Bodega"+str(i+1)}}
            result.append(x)
        self.write({"result": result})
        self.finish()

class GetVendedorHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        result = []
        for i in range(24):
            x={"_id":str(ObjectId()),"status":"Valido","name":"Vendedor"+str(i+1),"curp":"89687800"+str(i),"email":"vendedor"+str(i+1)+"@gmail.com","device":"74748848"+str(i),"phone":str(9789560+i),"stock":{"name":"Bodega"+str(i+1)}}
            result.append(x)
        self.write({"result": result})
        self.finish()

class GetVentasHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        result = []
        for i in range(24):
            x={"_id":str(ObjectId()),"date":"15enero2011","time":"11:59pm","observations":"observacion","amount":"4","products":"1500","geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"seller":{"name":"Vendedor"+str(i+1)},"salepoint":{"fridge":{"serial":"4747464"+str(i),"temperature":"-5","status":"Valido"}}}
            result.append(x)
        self.write({"result": result})
        self.finish()

class GetProductosHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        result = []
        for i in range(24):
            x={"_id":str(ObjectId()),"status":"Valido","name":"carne1","salePrice":"150","registrationDate":"15enero2011","count":"1500"}
            result.append(x)
        self.write({"result": result})
        self.finish()

class GetBodegasDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

    @cyclone.web.asynchronous
    def post(self):
        self.finish()

    @cyclone.web.asynchronous
    def delete(self):
        self.finish()

class GetPuntosDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

class GetVendedorDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

class GetVentasDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

class GetProductosDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

class LogoutHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

class LoginHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        self.write({"result": result})
        self.finish()

