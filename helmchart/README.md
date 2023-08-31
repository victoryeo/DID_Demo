## Repo to store helm chart 
#### It is an example of hello world image, setup with 
#### nginx ingress controller
#### It uses ingress ip address to access the hello world app

##### Steps to run:

helm install deployer deployer

helm install ingress-nginx ingress-nginx/ingress-nginx \
    --set controller.replicaCount=1 

kubectl apply -f ingress.yaml