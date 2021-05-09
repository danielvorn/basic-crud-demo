push:
	./mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=${tag}

