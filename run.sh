#!/bin/bash
cd /code/c964/web2/tornado
(npm run dev&)
cd /code/c964/server
(go run main.go&)
tail -f /dev/null