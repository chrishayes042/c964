FROM ubuntu
RUN mkdir /code
WORKDIR /code
COPY ./run.sh /code
RUN apt update && apt upgrade -y
RUN apt -y install curl gpg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update && apt upgrade -y
RUN apt -y install golang-go nodejs git
RUN git clone https://github.com/chrishayes042/c964.git
WORKDIR /code/c964/web2/tornado
RUN npm i

WORKDIR /code/c964/server
RUN chmod +x /code/run.sh
ENTRYPOINT ["/code/run.sh"]