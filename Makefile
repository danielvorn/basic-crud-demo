build-push:
	./mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=${tag}

connect-psql:
	docker run -it --rm postgres:alpine psql -h aa10ux0u8r2cuj2.cwopti9shd4d.us-east-2.rds.amazonaws.com -U phillysamurai -d postgres