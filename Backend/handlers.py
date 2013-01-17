
import cyclone.web
import pymongo

class Bodegas(cyclone.web.RequestHandler):
	def get(self):
		conection= pymongo.Connection('0.0.0.0',27017)
		db=conection["Mejorcita"]
		bodegasinfo= db["bodegasinfo"]
		
		self.object=int(self.get_argument("object",None))
		self.pagina=int(self.get_argument("pagina",None))-1
		self.keywords=self.get_argument("keywords",None)
		self.inicio=(self.pagina*self.object)
		self.final=self.inicio+self.object

		if self.keywords:
			for i in self.palabras:
				x=i.split('+')
				self.campo.update({x[0]:x[1]})

			#self.lista=[i for i in bodegasinfo.find()]
			#elf.write(self.keywords)
			#self.write(str({"Bodegas":(str(self.lista[self.inicio:self.final]))[1:-1]}))
		else:
			self.lista=[i for i in bodegasinfo.find()]
			self.write(str({"Bodegas":(str(self.lista[self.inicio:self.final]))[1:-1]}))			
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








