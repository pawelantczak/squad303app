<?php

$redis = new Redis();
$redis->connect($_ENV["REDIS_SERVER"], $_ENV["REDIS_PORT"]);
$redis->auth($_ENV["REDIS_PASS"]);
$redis->select($_ENV["REDIS_DB"]);
echo $redis->randomKey();

