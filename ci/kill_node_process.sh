NODEKEMENUPID=$(ps aux | grep '\s/root/node/bin/node\s' | awk '{print $2}')
if [ -n "$NODEKEMENUPID" ]; then echo "Killing app with PID $NODEKEMENUPID" && kill -9 $NODEKEMENUPID; else echo 'App not running'; fi
