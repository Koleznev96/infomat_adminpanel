FROM node:18.18.0 as build
WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH
ENV URL_HOST ${URL_HOST}

FROM nginx:1.21.3-alpine
#COPY --from=build /build/dist /opt/web
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/conf.d/ /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
