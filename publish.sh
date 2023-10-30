rm -r -f ./dist

docker build -t coda19-site-api:latest .

docker tag coda19-site-api:latest coda19/coda19-site-api:latest
docker push coda19/coda19-site-api:latest
echo "Finished running script sleeping 30s"
sleep 30