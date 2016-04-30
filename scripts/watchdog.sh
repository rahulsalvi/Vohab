#!/bin/bash

inotifywait -m -q -e create,modify,moved_to -r --format '%f' $1
