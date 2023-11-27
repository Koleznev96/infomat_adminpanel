FROM node:18.18.0 as build
WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH
ENV REACT_APP_URL_API ${REACT_APP_URL_API}
COPY . /build/
RUN yarn install
RUN yarn web:build

FROM nginx:1.21.3-alpine
COPY --from=build /build/packages/web/build /opt/web
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/conf.d/ /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
