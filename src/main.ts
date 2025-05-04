import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	const config = new DocumentBuilder()
	.setTitle("The Metall Todo API")
	.setDescription("an API with authentication in order to proper CRUDing")
	.setVersion("1.001")
	.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory)

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
