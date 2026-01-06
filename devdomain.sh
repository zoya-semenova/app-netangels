#!/usr/bin/env bash

# Дериктория с проектами
sitePath="../../sites/"

# Hostname to add/remove.
hostname="$2"

yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }

down() {
    rm -rf ./www
    docker-compose down
    echo "Remove link and stop docer";
}

up() {
    ln -s $sitePath$hostname/ www
    docker-compose up -d
    echo "Add link $hostname from progect";
}

$@