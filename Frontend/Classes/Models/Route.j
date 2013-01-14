/*
 * Routes.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@implementation Route : CPObject{
	CPString urlPatern @accessors;
	id params @accessors;
	SEL callback @accessors;
}
@end
