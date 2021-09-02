NODEKEMENUPID=$(ps aux | grep '\snode\s' | awk '{print $2}')
if [ -n "$NODEKEMENUPID" ]; then echo "Killing app with PID $NODEKEMENUPID" && kill -9 $NODEKEMENUPID; else echo 'App not running'; fi
