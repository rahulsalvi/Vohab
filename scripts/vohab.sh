#!/bin/bash

./watchdog.sh recordings/ | python3 speechToText.py > /dev/null &
python3 realtime.py > /dev/null &
./watchdog.sh transcripts/ | python3 toJSON.py
