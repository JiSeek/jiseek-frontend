#/bin/sh

[ ! $1 ] && echo 'why?' && exit 1

if [ $1 == 'build' ]; then
        docker-compose -f docker-compose.yml down
        # rm -rf frontend
        # git clone -b sprint https://kdt-gitlab.elice.io/002-part3-cnn/team2/frontend.git
        # cp -ar docker/. frontend
        # cd frontend
        docker-compose -f docker-compose.yml up -d --build
        # cd ..
elif [ $1 == 'update' ]; then
        # cd frontend
        docker-compose -f docker-compose.yml down
        docker-compose -f docker-compose.yml up -d --build
        # cd ..
elif [ $1 == 'up' ]; then
        docker-compose -f ./frontend/docker-compose.yml up -d
elif [ $1 == 'down' ]; then
        docker-compose -f ./frontend/docker-compose.yml down
elif [ $1 == 'access' ]; then
        docker run -it frontend_jiseek /bin/sh
fi