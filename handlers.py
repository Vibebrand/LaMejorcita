import cyclone.web  
import cyclone.escape
import os
from urllib2 import HTTPError
from Backend import MasterController
import json

class GetBodegasHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.object=int(self.get_argument("objects",None))
        self.keywords=self.get_argument("keywords",None)
        self.inicio=(int(self.get_argument("page",None))-1)*self.object

        MasterController.obtenerbodegas(param={"status":"1"},skip=self.inicio,limit=self.object,accion=muestra)

    #x={"_id":str(ObjectId()),"name":"Bodega"+str(i+1),"status":"Valido","address": {"district":"Colonia","street":"Calle","intNum": None, "extNum": 100} ,"phone":str(9789560+i),"businessName":"Negocio"+str(i+1),"manager":{"_id":str(ObjectId()),"status":"Valido","username":"Manager"+str(i+1),"password":"pass","curp":"89687800"+str(i),"phone":"9781200","email":"manager"+str(i+1)+"@gmail.com","type":"mamanger"},"geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"maxSale":"1500","minSale":"0","products":{"_id":str(ObjectId()),"2013/01/01": "1500","2013/01/02": "1200"}}

class GetPuntosHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.object=int(self.get_argument("objects",None))
        self.keywords=self.get_argument("keywords",None)
        self.inicio=(int(self.get_argument("page",None))-1)*self.object
        self.idbodega=self.get_argument("stockid",None)

        MasterController.obtenerpuntos(stock=self.idbodega,param={"status":"1"},skip=self.inicio,limit=self.object,accion=muestra)

    #x={"_id":str(ObjectId()),"name":"Punto"+str(1+1) ,"status":"Valido","phone":str(9789560+i),"email":"punto"+str(i+1)+"@gmail.com","joinDate":"15enero2010","fridge":{"serial":"4747464"+str(i),"temperature":"-5","status":"Valido"},"representative":{"name":"representante"+str(i+1),"phone":str(9789560+i),"email":"representante"+str(i+1)+"@gmail.com"},"stock":{"name":"Bodega"+str(i+1)}}

class GetVendedorHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.object=int(self.get_argument("objects",None))
        self.keywords=self.get_argument("keywords",None)
        self.inicio=(int(self.get_argument("page",None))-1)*self.object
        self.idbodega=self.get_argument("stockid",None)
        self.idpunto=self.get_argument("posid",None)

        MasterController.obtenervendedores(stock=self.idbodega,point=self.idpunto,param={"status":"1"},skip=self.inicio,limit=self.object,accion=muestra)

    #x={"_id":str(ObjectId()),"status":"Valido","name":"Vendedor"+str(i+1),"curp":"89687800"+str(i),"email":"vendedor"+str(i+1)+"@gmail.com","device":"74748848"+str(i),"phone":str(9789560+i),"stock":{"name":"Bodega"+str(i+1)}}

class GetVentasHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.object=int(self.get_argument("objects",None))
        self.keywords=self.get_argument("keywords",None)
        self.inicio=(int(self.get_argument("page",None))-1)*self.object
        self.idbodega=self.get_argument("stockid",None)
        self.idpunto=self.get_argument("posid",None)
        self.idvendedor=self.get_argument("sellerid",None)

        MasterController.obtenerventas(stock=self.idbodega,point=self.idpunto,seller=self.idvendedor,param={"status":"1"},skip=self.inicio,limit=self.object,accion=muestra)

    #x={"_id":str(ObjectId()),"date":"15enero2011","time":"11:59pm","observations":"observacion","amount":"4","products":"1500","geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"seller":{"name":"Vendedor"+str(i+1)},"salepoint":{"fridge":{"serial":"4747464"+str(i),"temperature":"-5","status":"Valido"}}}

class GetProductosHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.object=int(self.get_argument("objects",None))
        self.keywords=self.get_argument("keywords",None)
        self.inicio=(int(self.get_argument("page",None))-1)*self.object
        self.idbodega=self.get_argument("stockid",None)

        MasterController.obtenerproductos(stock=self.idbodega,param={"status":"1"},skip=self.inicio,limit=self.object,accion=muestra)

    #x={"_id":str(ObjectId()),"status":"Valido","name":"carne1","salePrice":"150","registrationDate":"15enero2011","count":"1500"}

class GetLotesHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.object=int(self.get_argument("objects",None))
        self.keywords=self.get_argument("keywords",None)
        self.inicio=(int(self.get_argument("page",None))-1)*self.object
        self.idbodega=self.get_argument("stockid",None)

        MasterController.obtenerlotes(stock=self.idbodega,param={"status":"1"},skip=self.inicio,limit=self.object,accion=muestra)

    #x={"_id":str(ObjectId()),"status":"Valido","name":"carne1","salePrice":"150","registrationDate":"15enero2011","count":"1500"}

class GetBodegasDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        Dictparam={"_id":self.get_argument("_id",None), "status":"1"}
        MasterController.obtenerbodegas(param=Dictparam,accion=muestra)

    @cyclone.web.asynchronous
    def delete(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()
        parametro=self.get_argument("_id",None)
        MasterController.eliminarbodegas(entityId=parametro,valuesToUpdate={"status":"0"},accion=muestra)

class GetPuntosDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        Dictparam=[{"_id":self.get_argument("_id",None)},{"status":"1"}]
        MasterController.obtenerpuntos(param=Dictparam,accion=muestra)

    @cyclone.web.asynchronous
    def delete(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()
        parametro=self.get_argument("_id",None)
        MasterController.eliminarpuntos(entityId=parametro,valuesToUpdate={"status":"0"},accion=muestra)

class GetVendedorDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        Dictparam=[{"_id":self.get_argument("_id",None)},{"status":"1"}]
        MasterController.obtenervendedores(param=Dictparam,accion=muestra)

    @cyclone.web.asynchronous
    def delete(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()
        parametro=self.get_argument("_id",None)
        MasterController.eliminarvendedores(entityId=parametro,valuesToUpdate={"status":"0"},accion=muestra)

class GetVentasDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        DDictparam=[{"_id":self.get_argument("_id",None)},{"status":"1"}]
        MasterController.obtenerventas(param=Dictparam,accion=muestra)

    @cyclone.web.asynchronous
    def delete(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()
        parametro=self.get_argument("_id",None)
        MasterController.eliminarventas(entityId=parametro,valuesToUpdate={"status":"0"},accion=muestra)

class GetProductosDetailHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        Dictparam=[{"_id":self.get_argument("_id",None)},{"status":"1"}]
        MasterController.obtenerproductos(param=Dictparam,accion=muestra)

    @cyclone.web.asynchronous
    def delete(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()
        parametro=self.get_argument("_id",None)
        MasterController.eliminarproductos(entityId=parametro,valuesToUpdate={"status":"0"},accion=muestra)

class GuardaBodegaHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def post(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.atributos=json.loads(self.get_argument("data",None))

        if not self.get_argument("_id",None):
            MasterController.guardabodega(atributos=self.atributos,accion=muestra)
        else:
            idvalor=self.get_argument("_id",None)
            MasterController.editabodega(idvalor=idvalor,atributos=self.atributos,accion=muestra)

class GuardaPuntoHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def post(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.atributos=json.loads(self.get_argument("data",None))

        if not self.get_argument("_id",None):
            MasterController.guardapunto(atributos=self.atributos,accion=muestra)  
        else:
            idvalor=self.get_argument("_id",None)
            MasterController.editapunto(idvalor=idvalor,atributos=self.atributos,accion=muestra)

class GuardaVendedorHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def post(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.atributos=json.loads(self.get_argument("data",None))

        if not self.get_argument("_id",None):
            MasterController.guardavendedor(atributos=self.atributos,accion=muestra)  
        else:
            idvalor=self.get_argument("_id",None)
            MasterController.editavendedor(idvalor=idvalor,atributos=self.atributos,accion=muestra)

class GuardaVentaHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def post(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.atributos=json.loads(self.get_argument("data",None))

        if not self.get_argument("_id",None):
            MasterController.guardaventa(atributos=self.atributos,accion=muestra)  
        else:
            idvalor=self.get_argument("_id",None)
            MasterController.editaventa(idvalor=idvalor,atributos=self.atributos,accion=muestra)

class GuardaProductoHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def post(self):
        def muestra(result):
            self.write({"result": result})
            self.finish()

        self.atributos=json.loads(self.get_argument("data",None))

        if not self.get_argument("_id",None):
            MasterController.guardaproducto(atributos=self.atributos,accion=muestra)  
        else:
            idvalor=self.get_argument("_id",None)
            MasterController.editaproducto(idvalor=idvalor,atributos=self.atributos,accion=muestra)

class LogoutHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        #self.write({"result": result})
        self.finish()

class LoginHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        #self.write({"result": result})
        self.finish()

class LlenarHandler(cyclone.web.RequestHandler):
    @cyclone.web.asynchronous
    def get(self):
        def muestra():
            self.write("llenado")
            self.finish()
        
        MasterController.llena(self.get_argument("categoria",None),muestra)

class RenderHandler(cyclone.web.StaticFileHandler):
    def get(self, path, include_body=True):
        if os.path.sep != "/":
            path = path.replace("/", os.path.sep)
        abspath = os.path.abspath(os.path.join(self.root, path))
        # os.path.abspath strips a trailing /
        # it needs to be temporarily added back for requests to root/
        if not (abspath + os.path.sep).startswith(self.root):
            raise HTTPError(403, "%s is not in root static directory", path)
        if os.path.isdir(abspath) and self.default_filename is not None:
            # need to look at the request.path here for when path is empty
            # but there is some prefix to the path that was already
            # trimmed by the routing
            if not self.request.path.endswith("/"):
                self.redirect(self.request.path + "/")
                return
            abspath = os.path.join(abspath, self.default_filename)
        if not os.path.exists(abspath):
            raise HTTPError(404)
        if not os.path.isfile(abspath):
            raise HTTPError(403, "%s is not a file", path)

        stat_result = os.stat(abspath)
        modified = datetime.datetime.fromtimestamp(stat_result.st_mtime)

        self.set_header("Last-Modified", modified)
        if "v" in self.request.arguments:
            self.set_header("Expires", datetime.datetime.utcnow() + \
                                       datetime.timedelta(days=365 * 10))
            self.set_header("Cache-Control", "max-age=" + str(86400 * 365 * 10))
        else:
            self.set_header("Cache-Control", "public")
        mime_type, encoding = mimetypes.guess_type(abspath)
        if mime_type:
            self.set_header("Content-Type", mime_type)

        self.set_extra_headers(path)

        # Check the If-Modified-Since, and don't send the result if the
        # content has not been modified
        ims_value = self.request.headers.get("If-Modified-Since")
        if ims_value is not None:
            date_tuple = email.utils.parsedate(ims_value)
            if_since = datetime.datetime.fromtimestamp(time.mktime(date_tuple))
            if if_since >= modified:
                self.set_status(304)
                return

        if not include_body:
            return
        file = open(abspath, "rb")
        try:
            self.write(file.read())
        finally:
            file.close()
