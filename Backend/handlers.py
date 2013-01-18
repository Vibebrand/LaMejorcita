import cyclone.web
from pymongo import Connection
import json

class Bodegas(cyclone.web.RequestHandler):
	def get(self):
		conection= Connection('0.0.0.0',27017)
		db=conection["Mejorcita"]
		bodegasinfo= db["bodegasinfo"]
		
		self.object=int(self.get_argument("object",None))
		self.pagina=int(self.get_argument("pagina",None))-1
		self.keywords=self.get_argument("keywords",None)
		self.inicio=(self.pagina*self.object)

		if self.keywords:
			self.final=self.inicio+self.object
			self.palabras={}
			self.keywords=self.keywords.split(' ')
			for i in (range(len(self.keywords)/2)):
				self.palabras.update({self.keywords[i]:json.loads(self.keywords[i+1])})
			self.lista=[i for i in bodegasinfo.find(spec=self.palabras)]
			self.write(str({"Bodegas":(str(self.lista[self.inicio:self.final]))[1:-1]}))
		else:
			self.lista=[i for i in bodegasinfo.find(skip=self.inicio,limit=self.object)]
			self.write(str({"Bodegas":(str(self.lista))[1:-1]}))			
		#todas , una ,

class Puntos(cyclone.web.RequestHandler):
	def get(self , punto):
		self.diccionario={}
		self.write(self.diccionario[punto])

		#por punto , por vendedor , por bodega , por refri

class Vendedor(cyclone.web.RequestHandler):
	def get(self , vendedor):
		self.diccionario={}
		self.write(self.diccionario[vendedor])


#por bodega , por punto , por vendedor , todos
class Refrigeradores(cyclone.web.RequestHandler):
	def get(self , punto):
		self.diccionario={}
		self.write(self.diccionario[punto])

#por punto , por refri , por bodega todos
