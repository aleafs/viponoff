#!/bin/bash
# vim: set expandtab tabstop=4 shiftwidth=4 foldmethod=marker: #

export LANG=en_US.UTF-8

. /etc/init.d/functions

declare STATUSURL="/status.taobao"
if [ "X" != "X${1}" ] ; then
    STATUSURL="${1}"
fi

if_status_by_viponoff() {
    curl --head --silent --max-time 5 --user-agent "viponoff monitor" "http://localhost${1}" \
        | grep -i "x-powered-by" | grep -c "viponoff"
}

declare -i RETCODE=0
echo -ne "check viponoff by ${STATUSURL} ..."
if [ `if_status_by_viponoff "${STATUSURL}"` -gt 0 ] ; then
    RETCODE=0
    echo_success
else
    RETCODE=1
    echo_failure
fi

echo && exit ${RETCODE}

