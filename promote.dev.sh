PACKAGE=.
REMOTEDIR=/home/ubuntu/holondash/
KEYPATH=~/Downloads/dev.pem
SERVERS=(50.112.141.57)

for ix in ${!SERVERS[*]}
do
    printf "......................\nConnecting to %s...\n" "${SERVERS[$ix]}"
    rsync -avzl -e "ssh -i ${KEYPATH}" --delete --exclude ".git" --exclude "config/local.js" --exclude ".tmp" ${PACKAGE} ubuntu@${SERVERS[$ix]}:${REMOTEDIR}
done
