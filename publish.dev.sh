rm -r -f ./dist

docker build -t coda19-site-api:dev .

docker tag coda19-site-api:dev coda19/coda19-site-api:dev
docker push coda19/coda19-site-api:dev
echo "Finished running script sleeping 30s"
sleep 30