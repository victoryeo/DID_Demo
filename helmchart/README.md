## Repo to store helm chart 
#### It is an example of hello world image, setup with 
#### nginx ingress controller
#### It uses ingress ip address to access the hello world app

##### Steps to run:

helm install helloworld helloworld  

helm install ingress-nginx ingress-nginx/ingress-nginx \
    --set controller.replicaCount=1  
**** or ***  
**** if you want to override nginx values ****  
helm install ingress-nginx ingress-nginx/ingress-nginx \
    --set controller.replicaCount=1 \
    --set controller.service.externalTrafficPolicy=Local \
    -f nginx-values.yaml  

kubectl apply -f ingress.yaml  