import cyclone.web  
import json
from Backend.Data.InterfazDB.DBmodule import DBModule

class BodegasHandler(cyclone.web.RequestHandler):
	@cyclone.web.asynchronous
	def get(self):
		def escribe(resultado):
			self.write(str({"result":(str(resultado))[1:-1]}))
			self.finish()

		self.object=int(self.get_argument("objects",None))
		self.keywords=self.get_argument("keywords",None)
		self.inicio=(int(self.get_argument("page",None))-1)*(self.object)

		if self.keywords:
			self.write(str(self.keywords))
		else:
			x=DBModule("bodegasinfo")
			x.getEntities(skip=self.inicio,limit=self.object).addCallback(lambda ign: escribe(x.getResult()))	

	@cyclone.web.asynchronous
	def post(self):
		pass

	@cyclone.web.asynchronous
	def delete(self):
		pass

		#todas , una ,

class PuntosHandler(cyclone.web.RequestHandler):
	def get(self , punto):
		self.diccionario={}
		self.write(self.diccionario[punto])

		#por punto , por vendedor , por bodega , por refri

class VendedorHandler(cyclone.web.RequestHandler):
	def get(self , vendedor):
		self.diccionario={}
		self.write(self.diccionario[vendedor])


#por bodega , por punto , por vendedor , todos
class RefrigeradoresHandler(cyclone.web.RequestHandler):
	def get(self , punto):
		self.diccionario={}
		self.write(self.diccionario[punto])

#por punto , por refri , por bodega todos
