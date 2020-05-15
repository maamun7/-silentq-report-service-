FROM node:12.16

LABEL maintainer="Mamun Ahmed <maamun7@gmail.com>"

# ------------------------------------------
# add app user
# ------------------------------------------
RUN useradd --user-group --create-home --shell /bin/false app

# ------------------------------------------
# difine app directory
# ------------------------------------------
ENV HOME=/var/www

# ------------------------------------------
# copy package.json directory
# ------------------------------------------
COPY package.json $HOME/

# ------------------------------------------
# set dicectory access permission to app user
# ------------------------------------------
RUN chown -R app:app $HOME/*

USER root

# ------------------------------------------
# set working dicectory
# ------------------------------------------
WORKDIR $HOME

# ------------------------------------------
# install the adonis CLI
# ------------------------------------------
RUN npm i -g @adonisjs/cli@latest

# ------------------------------------------
# install the npm
# ------------------------------------------
RUN npm install

# ------------------------------------------
# copy our initilization file and set permissions
# ------------------------------------------
COPY . $HOME

# ------------------------------------------
# copy our initilization file and set permissions
# ------------------------------------------
COPY docker-start.sh /docker-start.sh
RUN chmod 755 /docker-start.sh
SHELL ["/bin/bash", "-c"]

CMD ["/docker-start.sh"]