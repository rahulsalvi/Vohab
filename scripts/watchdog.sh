#!/bin/bash

inotifywait -m -q -e create -r --format '%f' $1
