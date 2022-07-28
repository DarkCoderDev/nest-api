import { NestFactory } from "@nestjs/core";
import { Process } from "@types/node";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const port: Process | number = process.env.PORT ?? 8000;

async function start() {
	const config = new DocumentBuilder()
		.setTitle("Backend")
		.setDescription("Example application with Nest.js")
		.setVersion("1.0.0")
		.addTag("DarkCoderDev")
		.build();

	const app = (await NestFactory.create(AppModule));

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("/api/docs", app, document);

	(await app.listen(port, () => console.log(`Server is running on port ${port}`)));
}

start();
