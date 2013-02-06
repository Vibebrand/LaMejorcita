import cyclone.web
from twisted.internet import reactor
from twisted.python import log
from handlers import *
import sys

class Application(cyclone.web.Application):
    def __init__(self):
        handlers = [
        (r"/stocks",GetBodegasHandler),
        (r"/points",GetPuntosHandler),
        (r"/sales",GetVentasHandler),
        (r"/sellers",GetVendedorHandler),
        (r"/products",GetProductosHandler),
        (r"/stocksdetail",GetBodegasDetailHandler),
        (r"/pointsdetail",GetPuntosDetailHandler),
        (r"/salesdetail",GetVentasDetailHandler),
        (r"/sellersdetail",GetVendedorDetailHandler),
        (r"/productsdetail",GetProductosDetailHandler),
        (r"/poststock",GuardaBodegaHandler),
        (r"/postpoint",GuardaPuntoHandler),
        (r"/postsale",GuardaVentaHandler),
        (r"/postseller",GuardaVendedorHandler),
        (r"/postproduct",GuardaProductoHandler),
        (r"/logout",LogoutHandler),
        (r"/login",LoginHandler),
        (r"/agregar",LlenarHandler),
        (r"/(.*)",RenderHandler, {"path": "Frontend"})
        ]
       

        settings = dict()
        cyclone.web.Application.__init__(self, handlers, **settings)

def main():
    log.startLogging(sys.stdout)
    reactor.listenTCP(8904, Application(), interface="0.0.0.0")
    reactor.run()

if __name__ == "__main__":
    main()
