import cyclone.web

class Bodegas(cyclone.web.RequestHandler):
	def get(self,bodega):
		self.diccionario={"AGS":{"name":"Bodega1","businessName":"Negocio1","adress":"Direccion1","manager":"Responsable1"},"GDL":{"name":"Bodega2","businessName":"Negocio2","adress":"Direccion2","manager":"Responsable2"},"QRO":{"name":"Bodega3","businessName":"Negocio3","adress":"Direccion3","manager":"Responsable3"},"Guanajuato":{"name":"Bodega4","Direccion":"Waterloo Sunset 490 Fracc. Villas","Responsable":"Cesar Gomez"}}
		self.write(self.diccionario[bodega])

class Bodegas