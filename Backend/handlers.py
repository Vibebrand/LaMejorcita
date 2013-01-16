
import cyclone.web
  
class Bodegas(cyclone.web.RequestHandler):
	def get(self):
		self.lista=[{"name":"Bodega1","businessName":"Negocio1","adress":"Direccion1","manager":"Responsable1"},
		{"name":"Bodega1","businessName":"Negocio1","adress":"Direccion1","manager":"Responsable1"},
		{"name":"Bodega2","businessName":"Negocio2","adress":"Direccion2","manager":"Responsable2"},
		{"name":"Bodega3","businessName":"Negocio3","adress":"Direccion3","manager":"Responsable3"},
		{"name":"Bodega4","businessName":"Negocio4","adress":"Direccion4","manager":"Responsable4"},
		{"name":"Bodega5","businessName":"Negocio5","adress":"Direccion5","manager":"Responsable5"},
		{"name":"Bodega6","businessName":"Negocio6","adress":"Direccion6","manager":"Responsable6"},
		{"name":"Bodega7","businessName":"Negocio7","adress":"Direccion7","manager":"Responsable7"},
		{"name":"Bodega8","businessName":"Negocio8","adress":"Direccion8","manager":"Responsable8"},
		{"name":"Bodega9","businessName":"Negocio9","adress":"Direccion9","manager":"Responsable9"},
		{"name":"Bodega10","businessName":"Negocio10","adress":"Direccion10","manager":"Responsable10"},
		{"name":"Bodega11","businessName":"Negocio11","adress":"Direccion11","manager":"Responsable11"},
		{"name":"Bodega12","businessName":"Negocio12","adress":"Direccion12","manager":"Responsable12"},
		{"name":"Bodega13","businessName":"Negocio13","adress":"Direccion13","manager":"Responsable13"},
		{"name":"Bodega14","businessName":"Negocio14","adress":"Direccion14","manager":"Responsable14"},
		{"name":"Bodega15","businessName":"Negocio15","adress":"Direccion15","manager":"Responsable15"},
		{"name":"Bodega16","businessName":"Negocio16","adress":"Direccion16","manager":"Responsable16"},
		{"name":"Bodega17","businessName":"Negocio17","adress":"Direccion17","manager":"Responsable17"},
		{"name":"Bodega18","businessName":"Negocio18","adress":"Direccion18","manager":"Responsable18"},
		{"name":"Bodega19","businessName":"Negocio19","adress":"Direccion19","manager":"Responsable19"},
		{"name":"Bodega20","businessName":"Negocio20","adress":"Direccion20","manager":"Responsable20"},
		{"name":"Bodega21","businessName":"Negocio21","adress":"Direccion21","manager":"Responsable21"},
		{"name":"Bodeg22","businessName":"Negocio22","adress":"Direccion22","manager":"Responsable22"},
		{"name":"Bodega23","businessName":"Negocio23","adress":"Direccion23","manager":"Responsable23"},
		{"name":"Bodega24","businessName":"Negocio24","adress":"Direccion24","manager":"Responsable24"},
		]
		self.object=int(self.get_argument("object",None))
		self.pagina=int(self.get_argument("pagina",None))
		self.keywords=self.get_argument("keywords",None)
		self.inicio=(self.pagina*self.object)-1
		self.final=self.inicio+self.object

		if self.keywords:
			
		else:
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








