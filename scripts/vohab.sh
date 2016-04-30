#!/bin/bash

./watchdog.sh recordings/ | python3 speechToText.py &
python3 realtime.py &
./watchdog.sh transcripts/ | python3 toJSON.py
